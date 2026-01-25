"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonProgressBodySchema = exports.LessonBodySchema = exports.CourseStructureSchema = exports.ModuleSchema = exports.LessonSchema = void 0;
const zod_1 = require("zod");
exports.LessonSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    videoId: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    videoUrl: zod_1.z.string().nullable(),
    durationSeconds: zod_1.z.number().nullable(),
    position: zod_1.z.number().int().positive(),
    isFree: zod_1.z.boolean(),
});
exports.ModuleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    position: zod_1.z.number().int().positive(),
    lessons: zod_1.z.array(exports.LessonSchema),
});
exports.CourseStructureSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    modules: zod_1.z.array(exports.ModuleSchema),
});
exports.LessonBodySchema = zod_1.z.object({
    courseSlug: zod_1.z.string().min(1),
    moduleSlug: zod_1.z.string().min(1),
    lessonSlug: zod_1.z.string().min(1),
});
exports.LessonProgressBodySchema = zod_1.z.object({
    completed: zod_1.z.boolean().optional(),
    seconds: zod_1.z.number().optional(),
    lessonId: zod_1.z.uuid(),
    userEmail: zod_1.z.string().min(1),
});
