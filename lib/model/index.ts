import { z } from "zod";

export function entitySchema(tableName: string) {
  return z.object({
    id: z.bigint().or(z.number()).or(z.string()),
    _tableName: z.literal(tableName),
  });
}

export type EntitySchema = ReturnType<typeof entitySchema>;

export type Entity = z.infer<EntitySchema>;

export function references<ES extends EntitySchema>(schema: ES) {
  return schema.transform((value: z.infer<ES>) => ({
    content: value,
    id: value.id,
    _tableName: value._tableName,
  }));
}

export type HydratableSchema<ES extends EntitySchema> = ReturnType<
  typeof references<ES>
>;

export type AnyHydratableSchema = HydratableSchema<EntitySchema>;

export type Hydratable<ES extends EntitySchema> = z.infer<HydratableSchema<ES>>;

export type AnyHydratable = Hydratable<EntitySchema>;

export type OmitMetadata<E extends Entity> = Omit<E, "id" | "_tableName">;
