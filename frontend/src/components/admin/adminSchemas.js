// src/schemas/adminSchemas.js
import * as z from "zod";

export const adminFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required").max(150),
  last_name: z.string().min(1, "Last name is required").max(150),
  phone_number: z.string().max(15, "Phone number must be 15 characters or less"),
  address: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});
