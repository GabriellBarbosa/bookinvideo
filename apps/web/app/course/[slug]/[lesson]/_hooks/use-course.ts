import { fetchCourseStructure } from "@/api/course.api";
import { useQuery } from "@tanstack/react-query";

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: fetchCourseStructure,
    enabled: !!slug,
  });
}
