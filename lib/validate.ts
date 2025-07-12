import * as z from "zod";

export function validate<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid fields!", details: result.error.flatten().fieldErrors };
  }
  return { data: result.data };
}
