"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams, useSearchParams } from "next/navigation";
import { CourseHeader } from "./_components/CourseHeader";
import { useCourseStructure } from "./_hooks/use-course-structure";
import { CourseSidebar } from "./_components/CourseSidebar";
import { useLesson } from "./_hooks/use-lesson";
import { YouTubePlayer } from "./_components/YoutubePlayer";
import { useSubmitLessonProgress } from "./_hooks/use-lesson-progress";

export default function Course() {
  const { slug: courseSlug, lesson: lessonSlug } = useParams();
  const searchParams = useSearchParams();
  const moduleSlug = searchParams.get("module");

  const { data: courseStructure, isLoading: courseStructureLoading } =
    useCourseStructure(courseSlug as string);

  const { data: lesson, isLoading: lessonLoading } = useLesson({
    courseSlug: courseSlug as string,
    lessonSlug: lessonSlug as string,
    moduleSlug,
  });

  const { mutate: lessonProgressMutate } = useSubmitLessonProgress();

  if (courseStructureLoading || lessonLoading) {
    return <div>Carregando</div>;
  }

  if (!courseStructure || !lesson) {
    return <div>Conteúdo indisponível</div>;
  }

  return (
    <div>
      <SidebarProvider>
        <CourseSidebar courseStructure={courseStructure} />

        <SidebarInset>
          <CourseHeader />

          <main className="p-6">
            <section className="space-y-4">
              <div className="overflow-hidden rounded-xl border bg-muted">
                {lesson.videoId ? (
                  <YouTubePlayer
                    videoId={lesson.videoId}
                    onPause={(seconds) => {
                      lessonProgressMutate({
                        lessonId: lesson.id,
                        seconds,
                      });
                    }}
                    onEnded={() => {
                      console.log("terminou");
                    }}
                  />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-muted-foreground">
                    Vídeo indisponível
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold leading-tight">
                  {lesson.title}
                </h1>
              </div>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
