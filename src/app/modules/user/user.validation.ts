import { z } from "zod";

const createUserValidationSchema = z.object({
       name: z.string(),
       email: z.string(),
       password: z.string(),
       image: z.string(),
       role: z.enum(["admin", "user"]).default("user"),
      
    
})

export const loginUserValidationSchema = z.object({
    email: z.string({required_error: "Email is required"}).email("Invalid email"),
    password: z.string({required_error: "Password is missing",}),
  });

export const UserValidation = {
    createUserValidationSchema,
    loginUserValidationSchema
}