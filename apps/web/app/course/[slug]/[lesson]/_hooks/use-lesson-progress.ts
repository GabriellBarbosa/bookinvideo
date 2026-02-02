import { submitLessonProgress } from "@/services/course.service";
import { useMutation } from "@tanstack/react-query";

export function useSubmitLessonProgress() {
  return useMutation({
    mutationFn: submitLessonProgress,
  });
}
