import * as z from "zod";

export const InstructorSchema = z.object({
  title: z.string().min(2, "Title is required"),
  specialization: z.string().min(3, "Specialization is required"),
  avatar: z.string().url("Valid avatar URL required"),
  bio: z.string().min(10, "Bio is required"),
});
