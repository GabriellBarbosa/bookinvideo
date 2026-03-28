import { Module } from '@nestjs/common';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../course/entities/course.entity';
import { LessonProgressEntity } from '../course/entities/lesson-progress.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CertificateEntity } from './entitites/certificate.entity';

@Module({
  controllers: [CertificateController],
  providers: [CertificateService],
  imports: [
    TypeOrmModule.forFeature([
      CertificateEntity,
      CourseEntity,
      LessonProgressEntity,
      UserEntity,
    ]),
  ],
})
export class CertificateModule {}
