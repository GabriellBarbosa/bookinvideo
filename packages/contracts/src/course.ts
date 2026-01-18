import { z } from "zod";

const LessonSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  videoUrl: z.string().nullable(),
  durationSeconds: z.number().nullable(),
  position: z.number().int().positive(),
  isFree: z.boolean(),
});

const ModuleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  position: z.number().int().positive(),
  lessons: z.array(LessonSchema),
});

export const CourseStructureSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  modules: z.array(ModuleSchema),
});
export type CourseStructure = z.infer<typeof CourseStructureSchema>;

export const GetLessonBodySchema = z.object({
  courseSlug: z.string().min(1),
  moduleSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
});
export type GetLessonBody = z.infer<typeof GetLessonBodySchema>;
