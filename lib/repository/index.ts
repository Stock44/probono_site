import { type z } from "zod";
import {
  type AnyHydratable,
  type AnyHydratableSchema,
  type Entity,
  type EntitySchema,
} from "../model";
import { errors, type Database } from "@/lib/db";
import { CreationError, NotFoundError } from "@/lib/repository/errors";

type HydratableKeys<ES extends Entity> = Array<
  keyof {
    [K in keyof ES as ES[K] extends AnyHydratable | AnyHydratable[] | null
      ? K
      : never]: ES[K];
  }
>;

export interface Repository<E extends Entity> {
  get: (id: E["id"], hydrate: HydratableKeys<E>) => Promise<E | null>;

  create: (data: Omit<E, "id" | "_tableName">) => Promise<E>;

  update: (
    id: E["id"],
    diff: Partial<Omit<E, "id" | "_tableName">>,
  ) => Promise<E>;

  drop: (id: E["id"]) => Promise<void>;
}

export function getRepositoryFactory<ES extends EntitySchema>(schema: ES) {
  return (db: Database): Repository<z.infer<ES>> => {
    // lowercase because postgres changes identifiers to lowercase
    const tableName = schema.shape._tableName.value.toLowerCase();

    const initDataSchema = schema.omit({
      id: true,
      _tableName: true,
    });
    const dataDiffSchema = schema
      .omit({
        id: true,
        _tableName: true,
      })
      .partial();

    return {
      async create(data) {
        const entityData = initDataSchema.parse(data);

        // lowercase because postgres changes identifiers to lowercase
        const keys = Object.keys(entityData).map((value) =>
          value.toLowerCase(),
        );
        const values = Object.values(entityData);

        try {
          const result = await db.one<z.infer<ES>>(
            "insert into $(tableName:name)($(keys:name)) values ($(values:csv)) returning *",
            {
              tableName,
              keys,
              values,
            },
          );
          return {
            ...result,
            _tableName: tableName,
          };
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

      async get(id, keysToHydrate) {
        const keys = keysToHydrate.map((value) =>
          value.toString().toLowerCase(),
        );

        let select = "select $1~.*";
        let joins = "";
        const values: any[] = [tableName];

        for (const [idx, [key, keySchema]] of keys
          .map((key): [string, AnyHydratableSchema] => [
            key,
            (schema as z.AnyZodObject).shape[key],
          ])
          .entries()) {
          const keySchemaTableName = keySchema
            .innerType()
            .shape._tableName.value.toLowerCase();

          values.push(keySchemaTableName, key);

          const formattedTableName = `$${2 * idx + 2}~`;
          const formattedKey = `$${2 * idx + 3}~`;

          select += `, row_to_json(${formattedTableName}.*) as ${formattedKey}`;
          joins += ` join ${formattedTableName} on (${formattedTableName}.id = $1~.${formattedKey})`;
        }

        select += " from $1~";
        values.push(id);

        const query = select + joins + ` where $1~.id=$${keys.length * 2 + 2}`;

        try {
          const result = await db.one<Record<string, any>>(query, values);

          for (const key of keys) {
            const tableName = (schema as z.AnyZodObject).shape[key]
              .innerType()
              .shape._tableName.value.toLowerCase();
            result[key] = {
              content: {
                ...result[key],
                _tableName: tableName,
              },
              id: result[key].id,
              _tableName: tableName,
            } satisfies AnyHydratable;
          }

          return {
            ...result,
            _tableName: tableName,
          };
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
        const validatedDiff = dataDiffSchema.parse(diff);
        // lowercase because postgres changes identifiers to lowercase
        const keys = Object.keys(validatedDiff).map((value) =>
          value.toLowerCase(),
        );
        const values = Object.values(validatedDiff);
        const result = await db.one<z.infer<ES>>(
          "update $(tableName~) set ($(keys~)) = ($(values:csv~)) where id = $(id)",
          {
            tableName,
            keys,
            values,
            id,
          },
        );
        return {
          ...result,
          _tableName: tableName,
        };
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
