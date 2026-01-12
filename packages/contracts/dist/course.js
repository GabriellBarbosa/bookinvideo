"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseStructureSchema = void 0;
const zod_1 = require("zod");
const LessonSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    videoUrl: zod_1.z.string().nullable(),
    durationSeconds: zod_1.z.number().nullable(),
    position: zod_1.z.number().int().positive(),
    isFree: zod_1.z.boolean(),
});
const ModuleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    position: zod_1.z.number().int().positive(),
    lessons: zod_1.z.array(LessonSchema),
});
exports.CourseStructureSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    modules: zod_1.z.array(ModuleSchema),
});
