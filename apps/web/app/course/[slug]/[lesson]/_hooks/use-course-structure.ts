import { fetchCourseStructure } from "@/services/course.api";
import { useQuery } from "@tanstack/react-query";

export function useCourseStructure(courseSlug: string) {
  return useQuery({
    queryKey: ["course", courseSlug],
    queryFn: fetchCourseStructure,
    enabled: !!courseSlug,
  });
}
