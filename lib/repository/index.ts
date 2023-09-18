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
import { CreationError, NotFoundError } from "@/lib/repository/errors";
import { type Id } from "@/lib/models/schemas";

type HydratableKeys<SP extends SchemaPrototype> =
  keyof SchemaReferencedSchemas<SP>;

export interface Repository<SP extends SchemaPrototype> {
  get: (
    id: Id,
    keysToHydrate: Array<HydratableKeys<SP>>,
  ) => Promise<SpecificEntity<SP> | null>;

  create: (data: InferModel<SP>) => Promise<SpecificEntity<SP>>;

  update: (
    id: Id,
    diff: Partial<InferModel<SP>>,
  ) => Promise<SpecificEntity<SP>>;

  drop: (id: Id) => Promise<void>;
}

export function formatAsPostgresName(key: string) {
  return key.toLowerCase();
}

export function getRepositoryFactory<SP extends SchemaPrototype>(
  schema: Schema<SP>,
) {
  // format identifiers into their postgres format
  const tableName = formatAsPostgresName(schema.name);
  const keysToColumnNames: Record<string, string> = {};
  for (const key of Object.keys(schema.validator.shape)) {
    keysToColumnNames[key] = formatAsPostgresName(key);
  }

  return (db: Database): Repository<SP> => {
    return {
      async create(data) {
        const parsedModel = schema.parse(data);

        // lowercase because postgres changes identifiers to lowercase
        const columns = Object.values(keysToColumnNames);
        const values = Object.keys(keysToColumnNames).map(
          (key) => parsedModel[key],
        );

        try {
          const result = await db.one<Entity & Record<string, unknown>>(
            "insert into $(tableName:name)($(columns:name)) values ($(values:csv)) returning *",
            {
              tableName,
              columns,
              values,
            },
          );

          const entity = {
            id: result.id,
          };

          // remap properties from their column names to their model object keys
          Object.entries(keysToColumnNames).forEach(([key, columnName]) => {
            Object.defineProperty(entity, key, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: result[columnName],
            });
          });

          return entity as SpecificEntity<SP>;
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
      },

      async get(id, keysToHydrate: Array<HydratableKeys<SP>> = []) {
        // format all keys to hydrate as lower case strings

        const values: any[] = [tableName]; // argument list, $1 being the table name

        let select = "select $1~.*"; // select * from main schema table
        let joins = ""; // store subsequent join statements with other tables

        // generate additional selects and joins for query
        for (const [idx, key] of keysToHydrate.entries()) {
          const keyModel = schema.references[key];

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
        // last parameter, specific id of the record to get
        values.push(id);

        // construct final query
        const query =
          select + joins + ` where $1~.id=$${keysToHydrate.length * 2 + 2}`;

        try {
          // perform query
          const result = await db.one<Entity & Record<string, unknown>>(
            query,
            values,
          );

          const entity = {
            id: result.id,
          };

          // remap properties from their column names to their model object keys
          Object.entries(keysToColumnNames).forEach(([key, columnName]) => {
            const value = result[columnName];
            if (key in schema.references) {
              const referencedSchema =
                schema.references[key as HydratableKeys<SP>];
              if (keysToHydrate.includes(key)) {
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
        } catch (error) {
          console.log(error);
          if (
            error instanceof errors.QueryResultError &&
            error.code === errors.queryResultErrorCode.noData
          ) {
            throw new NotFoundError();
          }

          throw error;
        }
      },

      async update(id, diff) {
        const parsedDiff = schema.validator.partial().parse(diff);

        const keys = Object.keys(diff);
        const columns = keys.map((key) => keysToColumnNames[key]);
        const values = keys.map((key) => parsedDiff[key]);

        const result = await db.one<Entity & Record<string, unknown>>(
          "update $(tableName:name) set ($(columns:name)) = ($(values:csv~)) where id = $(id)",
          {
            tableName,
            columns,
            values,
            id,
          },
        );

        const entity = {
          id: result.id,
        };

        // remap properties from their column names to their model object keys
        Object.entries(keysToColumnNames).forEach(([key, columnName]) => {
          Object.defineProperty(entity, key, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: result[columnName],
          });
        });

        return entity as SpecificEntity<SP>;
      },

      async drop(id) {
        await db.none("delete from $(tableName~) where id = $(id)", {
          tableName,
          id,
        });
      },
    };
  };
}
