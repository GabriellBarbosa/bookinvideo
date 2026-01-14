import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { CourseSidebar } from "./components/CourseSidebar";
import { CourseHeader } from "./components/CourseHeader";

interface Props {
  slug: string;
}

export default function CourseTemplate(props: Props) {
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
