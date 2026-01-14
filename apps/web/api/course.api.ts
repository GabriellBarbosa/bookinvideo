import { CourseStructure } from "@bookinvideo/contracts";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function fetchCourseStructure(
  ctx: QueryFunctionContext<[string, string]>
): Promise<CourseStructure> {
  const [, slug] = ctx.queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/course/course-structure/${slug}`
  );

  return res.json();
}
