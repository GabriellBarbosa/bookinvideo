"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserResponseSchema = exports.CreateUserBodySchema = exports.UserSchema = exports.UserRoleSchema = void 0;
const zod_1 = require("zod");
exports.UserRoleSchema = zod_1.z.enum(["user", "admin"]);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.email(),
    role: exports.UserRoleSchema,
    createdAt: zod_1.z.iso.datetime(), // use ISO string over Date for APIs
});
exports.CreateUserBodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.email(),
});
exports.CreateUserResponseSchema = exports.UserSchema;
