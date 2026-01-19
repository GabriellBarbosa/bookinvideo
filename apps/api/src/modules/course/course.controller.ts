import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
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
  async getLesson(
    @Query('courseSlug') courseSlug: string,
    @Query('moduleSlug') moduleSlug: string,
    @Query('lessonSlug') lessonSlug: string,
  ) {
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
