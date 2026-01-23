import { API_URL } from "@/config/nest-api-url";
import {
  CourseStructure,
  Lesson,
  LessonBody,
  LessonProgressBody,
} from "@bookinvideo/contracts";
import { QueryFunctionContext } from "@tanstack/react-query";

export type LessonProgressClientPayload = Pick<
  LessonProgressBody,
  "lessonId" | "seconds"
>;

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

export async function submitLessonProgress(
  body: LessonProgressClientPayload,
): Promise<null> {
  const res = await fetch(`/api/lesson-progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });

  if (!res.ok) {
    throw new Error("Failed to save lesson progress");
  }

  return res.json();
}
