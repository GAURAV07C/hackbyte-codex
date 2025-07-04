import * as z from "zod";

export const WebniarSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  instructor: z.string().min(1, { message: "Instructor name is required" }),
  instructorTitle: z
    .string()
    .min(1, { message: "Instructor title is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  level: z.string().min(1, { message: "Level is required" }),
  maxAttendees: z
    .string()
    .min(1, { message: "Max attendees is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" }),
  price: z.string().min(1, { message: "Price is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED", "CANCELED"]).optional(),
});
