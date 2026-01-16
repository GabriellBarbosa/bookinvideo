import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CourseSidebar } from "./components/CourseSidebar";
import { CourseHeader } from "./components/CourseHeader";
import { useCourse } from "@/hooks/use-course";

interface Props {
  slug: string;
  moduleName: string;
}

export default function CourseTemplate(props: Props) {
  const { data, isLoading } = useCourse(props.slug);

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
