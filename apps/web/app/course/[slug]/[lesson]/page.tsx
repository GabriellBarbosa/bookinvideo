"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams, useSearchParams } from "next/navigation";
import { CourseHeader } from "./_components/CourseHeader";
import { useCourseStructure } from "./_hooks/use-course-structure";
import { CourseSidebar } from "./_components/CourseSidebar";
import { useLesson } from "./_hooks/use-lesson";

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

  if (!courseStructure || courseStructureLoading) {
    return <div>Carregando</div>;
  }

  return (
    <div>
      <SidebarProvider>
        <CourseSidebar courseStructure={courseStructure} />

        <SidebarInset>
          <CourseHeader />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
