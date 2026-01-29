import { CourseStructure } from "@bookinvideo/contracts";
import { useQueryClient } from "@tanstack/react-query";

export function useCacheLessonCompletion() {
  function markLessonCompletedInCache(
    queryClient: ReturnType<typeof useQueryClient>,
    courseSlug: string,
    lessonSlug: string,
  ) {
    queryClient.setQueryData<CourseStructure | undefined>(
      ["course", courseSlug],
      (prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          modules: prev.modules.map((module) => {
            const hasLesson = module.lessons.some(
              (moduleLesson) => moduleLesson.slug === lessonSlug,
            );

            if (!hasLesson) return module;

            return {
              ...module,
              lessons: module.lessons.map((moduleLesson) =>
                moduleLesson.slug === lessonSlug
                  ? { ...moduleLesson, completed: true }
                  : moduleLesson,
              ),
            };
          }),
        };
      },
    );
  }

  return {
    markLessonCompletedInCache,
  };
}
