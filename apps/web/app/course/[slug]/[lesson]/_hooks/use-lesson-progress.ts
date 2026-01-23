import {
  LessonProgressClientPayload,
  submitLessonProgress,
} from "@/api/course.api";
import { useMutation } from "@tanstack/react-query";

export function useSubmitLessonProgress() {
  return useMutation({
    mutationFn: submitLessonProgress,
  });
}
