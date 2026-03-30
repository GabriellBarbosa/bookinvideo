import {
  Sidebar,
  SidebarFooter,
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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Props {
  courseStructure: CourseStructure;
  courseProgress: {
    progress: number;
    certificatePublicId: string | null;
  };
}

type Module = CourseStructure["modules"][number];
type Lesson = Module["lessons"][number];

export function CourseSidebar({ courseStructure, courseProgress }: Props) {
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
      <SidebarGroupContent className="overflow-y-auto pb-10 flex-1">
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
                            lesson.slug,
                          )}
                        >
                          <span>{lesson.title}</span>
                          {lesson.completed ? (
                            <span
                              className="w-[6px] h-[6px] rounded-full bg-destructive"
                              aria-label="aula completa"
                            ></span>
                          ) : (
                            <span
                              className="w-[6px] h-[6px] rounded-full border"
                              aria-label="aula não completa"
                            ></span>
                          )}
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
      <SidebarFooter>
        <div className="flex justify-between">
          <p className="text-xs">Seu progresso</p>
          <p className="text-xs">{courseProgress.progress} %</p>
        </div>

        <Progress value={courseProgress.progress} color="red-500" />

        {courseProgress.certificatePublicId && (
          <Link
            className="block"
            href={ROUTES.certificate(courseProgress.certificatePublicId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={`link`} className="w-full">
              Ver Certificado
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
