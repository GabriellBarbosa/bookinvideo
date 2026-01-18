import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  type GetLessonBody,
  GetLessonBodySchema,
} from '@bookinvideo/contracts';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/course-structure/:slug')
  async getCourseStructure(@Param('slug') slug: string) {
    const course = await this.courseService.getCourseStructure(slug);

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }

  @Get('/lesson')
  async getLesson(@Body() body: GetLessonBody) {
    const { courseSlug, lessonSlug, moduleSlug } =
      GetLessonBodySchema.parse(body);

    const lesson = await this.courseService.getLesson({
      courseSlug,
      lessonSlug,
      moduleSlug,
    });

    if (!lesson) {
      throw new NotFoundException();
    }

    return lesson;
  }
}
