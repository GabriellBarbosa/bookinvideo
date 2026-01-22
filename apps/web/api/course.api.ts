import { API_URL } from "@/config/nest-api-url";
import { CourseStructure, Lesson, LessonBody } from "@bookinvideo/contracts";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function fetchCourseStructure(
  ctx: QueryFunctionContext<[string, string]>,
): Promise<CourseStructure> {
  const [, slug] = ctx.queryKey;

  const res = await fetch(`${API_URL}/course/course-structure/${slug}`);

  return res.json();
}

export async function fetchLesson(
  ctx: QueryFunctionContext<
    [string, Omit<LessonBody, "moduleSlug"> & { moduleSlug: string | null }]
  >,
): Promise<Lesson> {
  const [, body] = ctx.queryKey;

  const { courseSlug, lessonSlug, moduleSlug } = body;

  const res = await fetch(
    `${API_URL}/course/lesson?courseSlug=${courseSlug}&moduleSlug=${moduleSlug}&lessonSlug=${lessonSlug}`,
  );

  return res.json();
}
