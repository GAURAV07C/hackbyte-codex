import * as z from "zod";

export const CategorySchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
});
