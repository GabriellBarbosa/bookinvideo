import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonProgress } from './entities/lesson-progress.entity';
import { UpsertLessonProgressUseCase } from './use-cases/upsert-lesson-progress.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lesson, LessonProgress])],
  controllers: [CourseController],
  providers: [CourseService, UpsertLessonProgressUseCase],
})
export class CourseModule {}
