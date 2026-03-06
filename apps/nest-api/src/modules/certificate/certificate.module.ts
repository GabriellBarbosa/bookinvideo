import { Module } from '@nestjs/common';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateEntity } from '../course/entities/certificate.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { LessonProgressEntity } from '../course/entities/lesson-progress.entity';
import { UserEntity } from '../user/entities/user.entity';

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
