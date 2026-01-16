import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CourseStructure } from "@bookinvideo/contracts";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

interface Props {
  courseStructure: CourseStructure;
}

type Module = CourseStructure["modules"][number];
type Lesson = Module["lessons"][number];

export function CourseSidebar({ courseStructure }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <p className="text-base font-semibold">{courseStructure.title}</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarGroupContent>
        <SidebarMenu>
          {courseStructure.modules.map((module: Module, index: number) => (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{module.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {module.lessons.map((lesson: Lesson, index: number) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <Link
                          className="flex items-center justify-between"
                          href={ROUTES.course(
                            courseStructure.slug,
                            module.slug,
                            lesson.slug
                          )}
                        >
                          <span>{lesson.title}</span>
                          <span className="w-[6px] h-[6px] rounded-full bg-green-400"></span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </Sidebar>
  );
}
