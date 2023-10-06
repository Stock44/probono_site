import type z from "zod";

export const decodeForm = async <Schema extends z.ZodTypeAny>(
  formDataOrRequest: FormData | Request,
  schema: Schema,
) => {
  const formData =
    formDataOrRequest instanceof FormData
      ? formDataOrRequest
      : await formDataOrRequest.clone().formData();

  return schema.parse(Object.fromEntries(formData)) as z.infer<Schema>;
};
