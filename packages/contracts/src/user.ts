import { z } from "zod";

export const UserRoleSchema = z.enum(["user", "admin"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  role: UserRoleSchema,
  createdAt: z.iso.datetime(), // use ISO string over Date for APIs
});
export type User = z.infer<typeof UserSchema>;

export const CreateUserBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  provider: z.enum(['google']),
  providerUserId: z.string().min(1),
  avatarUrl: z.string().optional().nullable()
});
export type CreateUserBody = z.infer<typeof CreateUserBodySchema>;

export const CreateUserResponseSchema = UserSchema;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
