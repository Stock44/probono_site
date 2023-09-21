import {
  type Entity,
  type InferModel,
  type Schema,
  Reference,
  type SpecificEntity,
  type SchemaPrototype,
  type SchemaReferencedSchemas,
} from "../models";
import { errors, type Database } from "@/lib/db";
import { CreationError } from "@/lib/repository/errors";
import { type Id } from "@/lib/models/schemas";

type HydratableKeys<SP extends SchemaPrototype> = Extract<
  keyof SchemaReferencedSchemas<SP>,
  string
>;

export function formatAsPostgresName(key: string) {
  return key.toLowerCase();
}

type OneResult = Entity & Record<string, unknown>;

export class Repository<SP extends SchemaPrototype> {
  protected readonly tableName: string;
  private readonly keysToColumnNames: Record<string, string>;

  constructor(
    protected readonly db: Database,
    private readonly schema: Schema<SP>,
  ) {
    this.tableName = formatAsPostgresName(schema.name);
    this.keysToColumnNames = {};
    for (const key of Object.keys(schema.validator.shape)) {
      this.keysToColumnNames[key] = formatAsPostgresName(key);
    }
  }

  protected buildSpecificEntity(
    result: OneResult,
    hydratedKeys: Array<HydratableKeys<SP>> = [],
  ): SpecificEntity<SP> {
    const entity = {
      id: result.id,
    };

    // remap properties from their column names to their model object keys
    Object.entries(this.keysToColumnNames).forEach(([key, columnName]) => {
      const value = result[columnName];
      if (key in this.schema.references) {
        const referencedSchema =
          this.schema.references[key as HydratableKeys<SP>];
        if ((hydratedKeys as string[]).includes(key)) {
          const referencedEntity = value as Entity;
          Object.defineProperty(entity, key, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Reference(
              referencedEntity.id,
              referencedSchema,
              referencedEntity,
            ),
          });
        } else {
          const id = value as Id;
          Object.defineProperty(entity, key, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Reference(id, referencedSchema, null),
          });
        }
      } else {
        Object.defineProperty(entity, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        });
      }
    });

    return entity as SpecificEntity<SP>;
  }

  async create(data: InferModel<SP>): Promise<SpecificEntity<SP>> {
    const parsedModel = this.schema.parse(data);

    // lowercase because postgres changes identifiers to lowercase
    const columns = Object.values(this.keysToColumnNames);
    const values = Object.keys(this.keysToColumnNames).map(
      (key) => parsedModel[key],
    );

    try {
      const result = await this.db.one<OneResult>(
        "insert into $(tableName:name)($(columns:name)) values ($(values:csv)) returning *",
        {
          tableName: this.tableName,
          columns,
          values,
        },
      );

      return this.buildSpecificEntity(result);
    } catch (e) {
      if (
        e instanceof errors.QueryResultError &&
        e.code === errors.queryResultErrorCode.noData
      ) {
        throw new CreationError();
      }

      console.log(e);
      throw e;
    }
  }

  async drop(id: Id): Promise<void> {
    await this.db.none("delete from $(tableName~) where id = $(id)", {
      tableName: this.tableName,
      id,
    });
  }

  protected buildSelectQuery<F extends keyof SpecificEntity<SP>>(
    field: F | undefined,
    value:
      | (F extends keyof SchemaReferencedSchemas<SP>
          ? Id
          : SpecificEntity<SP>[F])
      | undefined,
    keysToHydrate: Array<HydratableKeys<SP>> = [],
  ): [string, unknown[]] {
    const values: unknown[] = [this.tableName]; // argument list, $1 being the table name

    let select = "select $1~.*"; // select * from main schema table
    let joins = ""; // store subsequent join statements with other tables

    // generate additional selects and joins for query
    for (const [idx, key] of keysToHydrate.entries()) {
      const keyModel = this.schema.references[key];

      values.push(
        formatAsPostgresName(keyModel.name),
        formatAsPostgresName(key.toString()),
      );

      // get the specific indices for the table name and key name for this table
      const formattedTableName = `$${2 * idx + 2}~`;
      const formattedKey = `$${2 * idx + 3}~`;

      // generate select and join for current key
      select += `, row_to_json(${formattedTableName}.*) as ${formattedKey}`;
      joins += ` join ${formattedTableName} on (${formattedTableName}.id = $1~.${formattedKey})`;
    }

    // final statement for select, select from main table name
    select += " from $1~";

    let query = select + joins;

    if (field !== undefined && value !== undefined) {
      values.push(formatAsPostgresName(field as string));
      values.push(value);
      query += ` where $1~.$${keysToHydrate.length * 2 + 2}~=$${
        keysToHydrate.length * 2 + 3
      }`;
    }

    // construct final query
    return [query, values];
  }

  async getMany(
    keysToHydrate: Array<HydratableKeys<SP>>,
  ): Promise<Array<SpecificEntity<SP>>>;
  async getMany<F extends keyof SpecificEntity<SP>>(
    field: F,
    value: F extends keyof SchemaReferencedSchemas<SP>
      ? Id
      : SpecificEntity<SP>[F],
    keysToHydrate?: Array<HydratableKeys<SP>>,
  ): Promise<Array<SpecificEntity<SP>>>;
  async getMany<F extends keyof SpecificEntity<SP>>(
    field?: F,
    value?: F extends keyof SchemaReferencedSchemas<SP>
      ? Id
      : SpecificEntity<SP>[F],
    keysToHydrate: Array<HydratableKeys<SP>> = [],
  ): Promise<Array<SpecificEntity<SP>>> {
    // format all keys to hydrate as lower case strings
    const [query, values] = this.buildSelectQuery(field, value, keysToHydrate);

    const results = await this.db.manyOrNone<OneResult>(query, values);

    return results.map((result) => {
      return this.buildSpecificEntity(result, keysToHydrate);
    });
  }

  async getOne<F extends keyof SpecificEntity<SP>>(
    field: F,
    value: F extends keyof SchemaReferencedSchemas<SP>
      ? Id
      : SpecificEntity<SP>[F],
    keysToHydrate: Array<HydratableKeys<SP>> = [],
  ): Promise<SpecificEntity<SP> | null> {
    // format all keys to hydrate as lower case strings

    const [query, values] = this.buildSelectQuery(field, value, keysToHydrate);

    try {
      const result = await this.db.oneOrNone<OneResult>(query, values);

      return result != null
        ? this.buildSpecificEntity(result, keysToHydrate)
        : result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: Id,
    diff: Partial<InferModel<SP>>,
  ): Promise<SpecificEntity<SP>> {
    const parsedDiff = this.schema.validator.partial().parse(diff);

    const keys = Object.keys(parsedDiff);
    const columns = keys.map((key) => this.keysToColumnNames[key]);
    const values = keys.map((key) => parsedDiff[key]);

    try {
      const result = await this.db.one<OneResult>(
        "update $(tableName:name) set ($(columns:name)) = row($(values:csv)) where id = $(id) returning *",
        {
          tableName: this.tableName,
          columns,
          values,
          id,
        },
      );
      return this.buildSpecificEntity(result);
    } catch (e: unknown) {
      console.log(e);
      throw e;
    }
  }
}
