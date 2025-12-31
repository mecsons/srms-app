import * as z from "zod";

export const loginSchema = z.object({
    username: z.string().trim().nonempty("Username is required"),
    password: z.string().trim().nonempty("Password is required"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const defaultValues: LoginSchemaType =Object.fromEntries(
    Object.keys(loginSchema.shape).map((key) => [key, ""])
) as LoginSchemaType;