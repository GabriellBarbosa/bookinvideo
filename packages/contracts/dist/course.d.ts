import { z } from "zod";
export declare const CourseStructureSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    modules: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        slug: z.ZodString;
        position: z.ZodNumber;
        lessons: z.ZodArray<z.ZodObject<{
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
