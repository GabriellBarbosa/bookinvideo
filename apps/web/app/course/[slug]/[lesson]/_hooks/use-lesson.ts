import { fetchLesson } from "@/services/course.service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useLesson(lessonBody: {
  courseSlug: string;
  lessonSlug: string;
  moduleSlug: string | null;
}) {
  const params = useMemo(() => ({ ...lessonBody }), [lessonBody]);

  return useQuery({
    queryKey: ["lesson", params],
    queryFn: fetchLesson,
    enabled: !!lessonBody.moduleSlug,
  });
}
