import { z } from "zod";
export declare const LessonSchema: z.ZodObject<{
    id: z.ZodUUID;
    videoId: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    videoUrl: z.ZodNullable<z.ZodString>;
    durationSeconds: z.ZodNullable<z.ZodNumber>;
    position: z.ZodNumber;
    isFree: z.ZodBoolean;
}, z.core.$strip>;
export type Lesson = z.infer<typeof LessonSchema>;
export declare const ModuleSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    position: z.ZodNumber;
    lessons: z.ZodArray<z.ZodObject<{
        id: z.ZodUUID;
        videoId: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        videoUrl: z.ZodNullable<z.ZodString>;
        durationSeconds: z.ZodNullable<z.ZodNumber>;
        position: z.ZodNumber;
        isFree: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Module = z.infer<typeof ModuleSchema>;
export declare const CourseStructureSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    modules: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        slug: z.ZodString;
        position: z.ZodNumber;
        lessons: z.ZodArray<z.ZodObject<{
            id: z.ZodUUID;
            videoId: z.ZodString;
            title: z.ZodString;
            slug: z.ZodString;
            videoUrl: z.ZodNullable<z.ZodString>;
            durationSeconds: z.ZodNullable<z.ZodNumber>;
            position: z.ZodNumber;
            isFree: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CourseStructure = z.infer<typeof CourseStructureSchema>;
export declare const LessonBodySchema: z.ZodObject<{
    courseSlug: z.ZodString;
    moduleSlug: z.ZodString;
    lessonSlug: z.ZodString;
}, z.core.$strip>;
export type LessonBody = z.infer<typeof LessonBodySchema>;
export declare const LessonProgressBodySchema: z.ZodObject<{
    completed: z.ZodOptional<z.ZodBoolean>;
    seconds: z.ZodOptional<z.ZodNumber>;
    lessonId: z.ZodUUID;
}, z.core.$strip>;
export type LessonProgressBody = z.infer<typeof LessonProgressBodySchema>;
