import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/course-structure/:slug')
  async getCourseStructure(@Param('slug') slug: string) {
    console.log(slug);

    const course = await this.courseService.getCourseStructure(slug);

    console.log(course);

    return course;
  }
}
