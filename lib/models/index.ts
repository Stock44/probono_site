import { z } from "zod";
import { idSchema } from "@/lib/models/schemas";
import { id } from "postcss-selector-parser";

type Id = z.infer<typeof idSchema>;

export const entitySchema = z.object({
  id: idSchema,
});

export type Entity = z.infer<typeof entitySchema>;

export type AnyReferenceType = ReferenceType<any, boolean>;

export type AnySchema = Schema<any>;

export type SchemaPrototype = Record<string, z.ZodTypeAny | AnyReferenceType>;

export type ExtractSchemaPrototype<S extends AnySchema> = S extends Schema<
  infer SP
>
  ? SP
  : never;

export type SchemaValidator<SP extends SchemaPrototype> = z.ZodObject<{
  [K in keyof SP]: SP[K] extends ReferenceType<infer RSP, infer Nullish>
    ? ReferenceSchema<RSP, Nullish>
    : Exclude<SP[K], AnyReferenceType>;
}>;

export type SchemaReferencedSchemas<SP extends SchemaPrototype> = {
  [K in keyof SP as Extract<SP[K], AnyReferenceType> extends AnyReferenceType
    ? K
    : never]: Extract<SP[K], AnyReferenceType> extends ReferenceType<
    infer RSP,
    any
  >
    ? Schema<RSP>
    : never;
};

type InferInputModel<SP extends SchemaPrototype> = z.input<SchemaValidator<SP>>;

export type InferEntity<S extends AnySchema> = SpecificEntity<
  ExtractSchemaPrototype<S>
>;

export type InferModel<SP extends SchemaPrototype> = {
  [K in keyof InferInputModel<SP>]: InferInputModel<SP>[K] extends
    | Reference<infer RSP>
    | null
    | undefined
    ? InferInputModel<SP>[K] extends null | undefined
      ? SpecificEntity<RSP> | null | undefined
      : SpecificEntity<RSP>
    : InferInputModel<SP>[K];
};

export type InferValidatedModel<SP extends SchemaPrototype> = z.output<
  SchemaValidator<SP>
>;

export class Schema<SP extends SchemaPrototype> {
  public readonly references: SchemaReferencedSchemas<SP>;

  public readonly validator: SchemaValidator<SP>;

  constructor(
    public readonly name: string,
    prototype: SP,
  ) {
    this.references = Object.fromEntries(
      Object.entries(prototype)
        .filter(([, value]) => value instanceof ReferenceType)
        .map(([key, value]) => {
          return [key, (value as AnyReferenceType).schema];
        }),
    ) as SchemaReferencedSchemas<SP>;
    this.validator = z.object(
      Object.fromEntries(
        Object.entries(prototype).map(([key, value]) => {
          if (value instanceof ReferenceType) {
            return [key, referenceSchema(value.schema, value.nullish)];
          }

          return [key, value];
        }),
      ),
    ) as SchemaValidator<SP>;
  }

  parse(value: Record<string, unknown>): InferValidatedModel<SP> {
    return this.validator.parse(value);
  }

  safeParse(
    value: Record<string, unknown>,
  ): z.SafeParseReturnType<InferInputModel<SP>, InferValidatedModel<SP>> {
    return this.validator.safeParse(value);
  }
}

export type ExtractModel<S> = S extends Schema<infer SP>
  ? InferModel<SP>
  : never;

export class ReferenceType<
  SP extends SchemaPrototype,
  Nullish extends boolean,
> {
  constructor(
    public readonly schema: Schema<SP>,
    public readonly nullish: Nullish,
  ) {}
}

export type SpecificEntity<SP extends SchemaPrototype> = Entity &
  InferModel<SP>;

export class Reference<SP extends SchemaPrototype> implements Entity {
  constructor(
    public readonly id: Id,
    public readonly schema: Schema<SP>,
    public readonly _value: InferModel<SP> | null,
  ) {
    for (const key of Object.keys(this.schema.validator.shape)) {
      Object.defineProperty(this, key, {
        get(): unknown {
          if (this._value == null) {
            throw new NotHydratedError(key);
          }
          return this._value[key];
        },
        set(value: unknown) {
          if (this._value == null) {
            throw new NotHydratedError(key);
          }
          this._value[key] = value;
        },
      });
    }
  }

  get hydrated() {
    return this._value != null;
  }
}

function referenceSchema<SP extends SchemaPrototype, Nullish extends boolean>(
  schema: Schema<SP>,
  nullish: Nullish,
): Nullish extends true
  ? z.ZodOptional<z.ZodNullable<z.ZodType<Reference<SP>>>>
  : z.ZodType<Reference<SP>> {
  const validator = entitySchema.passthrough().transform((value) => {
    const result = schema.safeParse(value);
    if (result.success) {
      return new Reference(value.id, schema, value as SpecificEntity<SP>);
    } else {
      return new Reference((value as SpecificEntity<SP>).id, schema, null);
    }
  });

  if (nullish) {
    return validator.nullish() as any;
  }
  return validator as any;
}

type ReferenceSchema<
  SP extends SchemaPrototype,
  Nullish extends boolean,
> = ReturnType<typeof referenceSchema<SP, Nullish>>;

export function references<SP extends SchemaPrototype, Nullish extends boolean>(
  schema: Schema<SP>,
  nullish: Nullish = false as any,
) {
  return new ReferenceType(schema, nullish);
}

export class NotHydratedError extends Error {
  constructor(key: string) {
    super(`can't use value inside non-hydrated key ${key}`);
  }
}
