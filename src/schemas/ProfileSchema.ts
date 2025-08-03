import * as z from "zod";


export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Valid email is required",
  }),
  phone: z.string().min(7, {
    message: "Phone number is required",
  }),
  location: z.string().optional(),
  website: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  company: z.string().optional(),
  designation: z.string().optional(),
  college: z.string().optional(),
  collegeLocation: z.string().optional(),
  currentYear: z.string().optional(),
  bio: z.string().optional(),
});
