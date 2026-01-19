"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams, useSearchParams } from "next/navigation";
import { CourseHeader } from "./_components/CourseHeader";
import { useCourseStructure } from "./_hooks/use-course-structure";
import { CourseSidebar } from "./_components/CourseSidebar";
import { useLesson } from "./_hooks/use-lesson";

function youtubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    return `https://www.youtube.com/embed${parsed.pathname}?rel=0&modestbranding=0&controls=1&iv_load_policy=3`;
  } catch {
    return url;
  }
}

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

          <main className="p-6 space-y-4 max-w-sm">
            <section className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                {lesson.videoUrl ? (
                  <iframe
                    key={lesson.videoUrl}
                    src={youtubeEmbedUrl(lesson.videoUrl)}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
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
