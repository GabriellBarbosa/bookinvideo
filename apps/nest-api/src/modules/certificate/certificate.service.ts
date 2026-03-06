import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { customAlphabet } from 'nanoid';
import { Observable, Subject } from 'rxjs';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CertificateEntity } from '../course/entities/certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../course/entities/course.entity';
import { LessonProgressEntity } from '../course/entities/lesson-progress.entity';

type CertEvent = { type: string; data: { message: string } };

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CertificateEntity)
    private readonly certificateRepository: Repository<CertificateEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(LessonProgressEntity)
    private readonly lessonProgressRepository: Repository<LessonProgressEntity>,
  ) {}
  private channels = new Map<string, Subject<CertEvent>>();

  stream(key: string): Observable<CertEvent> {
    let subject = this.channels.get(key);

    if (!subject) {
      subject = new Subject<CertEvent>();
      this.channels.set(key, subject);
    }

    return subject.asObservable();
  }

  getStreamKey(userEmail: string, courseId: string) {
    return `${userEmail}:${courseId}`;
  }

  private emit(key: string, event: CertEvent) {
    const subject = this.channels.get(key);
    subject?.next(event);
  }

  @OnEvent('generate-certificate')
  async handleGenerateCertificateEvent(payload: {
    userId: string;
    courseId: string;
  }) {
    const user = await this.userRepository.findOne({
      where: { uuid: payload.userId },
    });

    if (!user) return;

    const course = await this.courseRepository.findOne({
      where: { id: payload.courseId },
      relations: {
        modules: {
          lessons: true,
        },
      },
    });

    if (!course) return;

    const lessonIds = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => lesson.id).filter(Boolean),
    );

    if (lessonIds.length === 0) return;

    const progresses = await this.lessonProgressRepository.find({
      where: {
        userId: user.uuid,
        lessonId: In(lessonIds),
      },
      select: ['lessonId', 'completedAt'],
    });

    const completedLessonIds = new Set(
      progresses
        .filter((progress) => progress.completedAt)
        .map((progress) => progress.lessonId),
    );

    const allLessonsCompleted = lessonIds.every((id) =>
      completedLessonIds.has(id),
    );

    if (!allLessonsCompleted) return;

    const now = new Date();

    const nanoId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 16);

    await this.certificateRepository.save({
      publicId: nanoId(),
      userId: user.uuid,
      courseId: course.id,
      recipientName: user.name,
      courseTitle: course.title,
      workloadHours: course.estimatedHours ?? 0,
      completedAt: now,
      issuedAt: now,
      revoked: false,
      revokedAt: null,
      revokeReason: null,
    });

    console.log('Certificado GERADO 1');

    this.emit(this.getStreamKey(user.email, course.slug), {
      type: 'certificate_ready',
      data: {
        message: 'Certificado gerado!',
      },
    });
  }
}
