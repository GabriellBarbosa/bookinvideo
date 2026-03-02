import { getCourseProgress } from "@/services/course.service";
import { useQuery } from "@tanstack/react-query";

export function useCourseProgress(courseSlug: string) {
  return useQuery({
    queryKey: ["course-progress", courseSlug],
    queryFn: getCourseProgress,
    enabled: !!courseSlug,
  });
}
