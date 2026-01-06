import { z } from "zod";
export declare const UserRoleSchema: z.ZodEnum<{
    user: "user";
    admin: "admin";
}>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    email: z.ZodEmail;
    role: z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
export declare const CreateUserBodySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    provider: z.ZodEnum<{
        google: "google";
    }>;
    providerUserId: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateUserBody = z.infer<typeof CreateUserBodySchema>;
export declare const CreateUserResponseSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    email: z.ZodEmail;
    role: z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
