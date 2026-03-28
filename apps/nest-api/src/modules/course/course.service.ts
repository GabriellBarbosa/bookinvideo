import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import {
  CourseStructure,
  LessonBody,
  Lesson as LessonType,
} from '@bookinvideo/contracts';
import { LessonEntity } from './entities/lesson.entity';
import { LessonProgressEntity } from './entities/lesson-progress.entity';
import { UserEntity } from '../user/entities/user.entity';
import { AuthUser } from '@/auth/auth-user.type';
import { In } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(LessonProgressEntity)
    private readonly lessonProgressRepository: Repository<LessonProgressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getCourseStructure(slug: string, authUser?: AuthUser) {
    const course = await this.courseRepository.findOne({
      where: { slug },
      relations: {
        modules: {
          lessons: true,
        },
      },
      order: {
        modules: {
          position: 'ASC',
          lessons: {
            position: 'ASC',
          },
        },
      },
    });

    if (!course) {
      return null;
    }

    const completedLessons = await this.findCompletedLessons(course, authUser);

    return this.mountCourseStructure(course, completedLessons);
  }

  private async findCompletedLessons(
    course: CourseEntity,
    authUser?: AuthUser,
  ): Promise<Set<string> | undefined> {
    if (!authUser) return undefined;

    const user = await this.userRepository.findOne({
      where: { email: authUser.email },
      select: ['uuid', 'email'],
    });

    if (!user) return undefined;

    const lessonIds = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => lesson.id).filter(Boolean),
    );

    if (lessonIds.length === 0) return undefined;

    const progresses = await this.lessonProgressRepository.find({
      where: {
        userId: user.uuid,
        lessonId: In(lessonIds),
      },
      select: ['lessonId', 'completedAt'],
    });

    return new Set(
      progresses
        .filter((progress) => progress.completedAt)
        .map((progress) => progress.lessonId),
    );
  }

  private mountCourseStructure(
    course: CourseEntity,
    completedLessons?: Set<string>,
  ): CourseStructure {
    return {
      title: course.title,
      slug: course.slug,
      modules: course.modules.map((module) => ({
        title: module.title,
        position: module.position,
        slug: module.slug,
        lessons: module.lessons.map((lesson) => {
          const lessonData: LessonType = {
            id: lesson.id,
            videoId: lesson.videoId,
            title: lesson.title,
            slug: lesson.slug,
            videoUrl: lesson.videoUrl,
            durationSeconds: lesson.durationSeconds,
            position: lesson.position,
            isFree: lesson.isFree,
          };

          if (completedLessons) {
            lessonData.completed = completedLessons.has(lesson.id);
          }

          return lessonData;
        }),
      })),
    };
  }

  async getLesson({
    courseSlug,
    moduleSlug,
    lessonSlug,
    authUser,
  }: LessonBody & { authUser?: AuthUser }): Promise<LessonType | null> {
    const lesson = await this.lessonRepository.findOne({
      where: {
        slug: lessonSlug,
        module: {
          slug: moduleSlug,
          course: {
            slug: courseSlug,
          },
        },
      },
    });

    if (!lesson) {
      return null;
    }

    const course = await this.courseRepository.findOne({
      where: { slug: courseSlug },
      relations: {
        modules: {
          lessons: true,
        },
      },
      order: {
        modules: {
          position: 'ASC',
          lessons: {
            position: 'ASC',
          },
        },
      },
    });

    const orderedLessons =
      course?.modules.flatMap((module) =>
        module.lessons.map((moduleLesson) => ({
          lessonSlug: moduleLesson.slug,
          moduleSlug: module.slug,
          courseSlug,
        })),
      ) ?? [];

    const currentLessonIndex = orderedLessons.findIndex(
      (moduleLesson) =>
        moduleLesson.lessonSlug === lessonSlug &&
        moduleLesson.moduleSlug === moduleSlug,
    );

    const completedLessons = course
      ? await this.findCompletedLessons(course, authUser)
      : undefined;

    return {
      id: lesson.id,
      videoId: lesson.videoId,
      title: lesson.title,
      slug: lesson.slug,
      videoUrl: lesson.videoUrl,
      durationSeconds: lesson.durationSeconds,
      position: lesson.position,
      isFree: lesson.isFree,
      prev:
        currentLessonIndex > 0 ? orderedLessons[currentLessonIndex - 1] : null,
      next:
        currentLessonIndex >= 0 &&
        currentLessonIndex < orderedLessons.length - 1
          ? orderedLessons[currentLessonIndex + 1]
          : null,
      ...(completedLessons && { completed: completedLessons.has(lesson.id) }),
    };
  }

  async getCourseProgress(payload: { userEmail: string; courseSlug: string }) {
    const user = await this.userRepository.findOne({
      where: { email: payload.userEmail },
      select: ['uuid'],
    });

    if (!user) return 0;

    const course = await this.courseRepository.findOne({
      where: { slug: payload.courseSlug },
      relations: {
        modules: {
          lessons: true,
        },
      },
    });

    if (!course) return 0;

    const lessonIds = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => lesson.id).filter(Boolean),
    );

    if (lessonIds.length === 0) return 0;

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

    return Math.round((completedLessonIds.size / lessonIds.length) * 100);
  }
}
