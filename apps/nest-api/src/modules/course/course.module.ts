import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseEntity } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { LessonProgressEntity } from './entities/lesson-progress.entity';
import { UpsertLessonProgressUseCase } from './use-cases/upsert-lesson-progress.use-case';
import { UserEntity } from '../user/entities/user.entity';
import { CertificateEntity } from '../certificate/entitites/certificate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      LessonEntity,
      LessonProgressEntity,
      UserEntity,
      CertificateEntity,
    ]),
  ],
  controllers: [CourseController],
  providers: [
    CourseService,
    UpsertLessonProgressUseCase,
    {
      provide: 'COURSE_EVENT_EMITTER',
      useValue: {
        emit: () => undefined,
      },
    },
  ],
})
export class CourseModule {}
