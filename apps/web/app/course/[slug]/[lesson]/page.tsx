"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { CourseHeader } from "./_components/CourseHeader";
import { useCourse } from "./_hooks/use-course";
import { CourseSidebar } from "./_components/CourseSidebar";

export default function Course() {
  const { slug } = useParams();
  const { data, isLoading } = useCourse(slug as string);

  if (!data || isLoading) {
    return <div>Carregando</div>;
  }

  return (
    <div>
      <SidebarProvider>
        <CourseSidebar courseStructure={data} />

        <SidebarInset>
          <CourseHeader />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
