import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { CourseSidebar } from "./components/CourseSidebar";
import { CourseHeader } from "./components/CourseHeader";
import { useCourse } from "@/hooks/use-course";

interface Props {
  slug: string;
}

export default function CourseTemplate(props: Props) {
  const { data, isLoading, isError } = useCourse(props.slug);

  return (
    <div>
      <SidebarProvider>
        <CourseSidebar />

        <SidebarInset>
          <CourseHeader />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
