import { z } from "zod";

export const signupSchema = z
.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required " })
    .email({ message: "Not valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be at least 20 characters " }),
  confirm_password: z
    .string()
    .min(6, { message: "Cinfirm must be at least 6 characters" }),
})
.refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

export type ISignup = z.infer<typeof signupSchema>;
