import { CourseService } from './course.service';
import { UpsertLessonProgressUseCase } from './use-cases/upsert-lesson-progress.use-case';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  LessonProgressBodySchema,
  type LessonProgressBody,
} from '@bookinvideo/contracts';
import { User } from '@/auth/user.decorator';
import { type AuthUser } from '@/auth/auth-user.type';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly upsertLessonProgressUseCase: UpsertLessonProgressUseCase,
  ) {}

  @Get('/course-structure/:slug')
  async getCourseStructure(
    @Param('slug') slug: string,
    @User() user: AuthUser,
  ) {
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

  @Post('/lesson-progress')
  async upsertLessonProgress(@Body() body: LessonProgressBody) {
    const parsedBody = LessonProgressBodySchema.parse(body);
    return await this.upsertLessonProgressUseCase.execute(parsedBody);
  }
}
