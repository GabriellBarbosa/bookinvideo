import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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
}
