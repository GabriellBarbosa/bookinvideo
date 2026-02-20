"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams, useSearchParams } from "next/navigation";
import { CourseHeader } from "./_components/CourseHeader";
import { useCourseStructure } from "./_hooks/use-course-structure";
import { CourseSidebar } from "./_components/CourseSidebar";
import { useLesson } from "./_hooks/use-lesson";
import { YouTubePlayer } from "./_components/YoutubePlayer";
import { useSubmitLessonProgress } from "./_hooks/use-lesson-progress";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCacheLessonCompletion } from "./_hooks/use-cache-lesson-completion";
import { useSession } from "next-auth/react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon, User } from "lucide-react";
import { LoginButton } from "@/components/LoginButton";
import { handleSignIn } from "@/utils/auth";

export default function Course() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const moduleSlug = searchParams.get("module");
  const { slug: courseSlug, lesson: lessonSlug } = useParams();
  const { data: lesson, isLoading: lessonLoading } = useLesson({
    courseSlug: courseSlug as string,
    lessonSlug: lessonSlug as string,
    moduleSlug,
  });

  const { mutate: lessonProgressMutate } = useSubmitLessonProgress();
  const { markLessonCompletedInCache } = useCacheLessonCompletion();
  const { data: courseStructure, isLoading: courseStructureLoading } =
    useCourseStructure(courseSlug as string);

  const handleCompleteLesson = (lessonId: string) => {
    if (!session) {
      return;
    }

    lessonProgressMutate({
      completed: true,
      lessonId,
    });

    markLessonCompletedInCache(
      queryClient,
      courseSlug as string,
      lessonSlug as string,
    );
  };

  if (courseStructureLoading || lessonLoading) {
    return <div>Carregando...</div>;
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
            <section className="max-w-[1200px] space-y-4 mx-auto">
              {!session && (
                <Alert>
                  <InfoIcon />
                  <AlertTitle>Você não está logado</AlertTitle>
                  <AlertDescription>
                    Faça login para salvar seu progresso e gerar o certificado.
                  </AlertDescription>
                  <AlertAction
                    className="mt-4 col-start-2"
                    onClick={handleSignIn}
                  >
                    <Button>
                      <User /> Entrar com Google
                    </Button>
                  </AlertAction>
                </Alert>
              )}

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
                      handleCompleteLesson(lesson.id);
                    }}
                  />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-muted-foreground">
                    Vídeo indisponível
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-2xl font-semibold leading-tight">
                    {lesson.title}
                  </h1>

                  {session && (
                    <Button
                      size="sm"
                      onClick={() => handleCompleteLesson(lesson.id)}
                    >
                      concluir
                    </Button>
                  )}
                </div>
              </div>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
