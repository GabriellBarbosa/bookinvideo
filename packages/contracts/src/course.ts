import { z } from "zod";

export const LessonSchema = z.object({
  id: z.uuid(),
  videoId: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  videoUrl: z.string().nullable(),
  durationSeconds: z.number().nullable(),
  position: z.number().int().positive(),
  isFree: z.boolean(),
  completed: z.boolean().optional()
});
export type Lesson = z.infer<typeof LessonSchema>;

export const ModuleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  position: z.number().int().positive(),
  lessons: z.array(LessonSchema),
});
export type Module = z.infer<typeof ModuleSchema>;

export const CourseStructureSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  modules: z.array(ModuleSchema),
});
export type CourseStructure = z.infer<typeof CourseStructureSchema>;

export const LessonBodySchema = z.object({
  courseSlug: z.string().min(1),
  moduleSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
});
export type LessonBody = z.infer<typeof LessonBodySchema>;

export const LessonProgressBodySchema = z.object({
  completed: z.boolean().optional(),
  seconds: z.number().optional(),
  lessonId: z.uuid(),
});
export type LessonProgressBody = z.infer<typeof LessonProgressBodySchema>;
