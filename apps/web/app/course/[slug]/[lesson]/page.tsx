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
import {
  ChevronLeft,
  ChevronRight,
  InfoIcon,
  User,
} from "lucide-react";
import { handleSignIn } from "@/utils/auth";
import { useCourseProgress } from "./_hooks/use-course-progress";
import { toast } from "sonner";
import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function Course() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const moduleSlug = searchParams.get("module");

  const { data: session } = useSession();
  const { slug: courseSlug, lesson: lessonSlug } = useParams();
  const { data: courseProgress, refetch: refetchCourseProgress } =
    useCourseProgress(courseSlug as string);
  const {
    data: lesson,
    isLoading: lessonLoading,
    refetch: refetchLesson,
  } = useLesson({
    courseSlug: courseSlug as string,
    lessonSlug: lessonSlug as string,
    moduleSlug,
  });
  const { data: courseStructure, isLoading: courseStructureLoading } =
    useCourseStructure(courseSlug as string);
  const { mutate: lessonProgressMutate } = useSubmitLessonProgress();
  const { markLessonCompletedInCache } = useCacheLessonCompletion();

  useEffect(() => {
    const eventSource = new EventSource(`/api/certificate-sse/${courseSlug}`);

    eventSource.addEventListener("certificate_ready", () => {
      toast.success("Seu certificado está pronto!", {
        duration: 5000,
      });
    });

    return () => {
      eventSource.close();
    };
  }, [courseSlug, toast]);

  const handleCompleteLesson = async (lessonId: string) => {
    if (!session) {
      return;
    }

    lessonProgressMutate(
      {
        completed: true,
        lessonId,
      },
      {
        onSuccess: () => {
          refetchCourseProgress();
          refetchLesson();
          markLessonCompletedInCache(
            queryClient,
            courseSlug as string,
            lessonSlug as string,
          );

          toast.success("Aula completa com sucesso!", {
            duration: 5000,
            position: "top-right",
          });
        },
      },
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
        <CourseSidebar
          courseStructure={courseStructure}
          courseProgress={
            courseProgress || {
              progress: 0,
              certificatePublicId: null,
            }
          }
        />

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

              <div className="flex items-center justify-between gap-4">
                <div>
                  {lesson.prev && (
                    <Link
                      href={ROUTES.course(
                        lesson.prev.courseSlug,
                        lesson.prev.moduleSlug,
                        lesson.prev.lessonSlug,
                      )}
                    >
                      <Button
                        variant={"outline"}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft />
                        anterior
                      </Button>
                    </Link>
                  )}
                </div>
                <div>
                  {session && !lesson.completed && (
                    <Button
                      size="sm"
                      variant={"outline"}
                      onClick={() => handleCompleteLesson(lesson.id)}
                    >
                      completar
                    </Button>
                  )}
                </div>
                <div>
                  {lesson.next && (
                    <Link
                      href={ROUTES.course(
                        lesson.next.courseSlug,
                        lesson.next.moduleSlug,
                        lesson.next.lessonSlug,
                      )}
                    >
                      <Button
                        variant={"outline"}
                        className="flex items-center gap-2"
                      >
                        próximo
                        <ChevronRight />
                      </Button>
                    </Link>
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
