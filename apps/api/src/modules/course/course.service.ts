import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import {
  CourseStructure,
  LessonBody,
  Lesson as LessonType,
} from '@bookinvideo/contracts';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async getCourseStructure(slug: string) {
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

    return this.mountCourseStructure(course);
  }

  private mountCourseStructure(course: Course): CourseStructure {
    return {
      title: course.title,
      slug: course.slug,
      modules: course.modules.map((module) => ({
        title: module.title,
        position: module.position,
        slug: module.slug,
        lessons: module.lessons.map((lesson) => ({
          title: lesson.title,
          slug: lesson.slug,
          videoUrl: lesson.videoUrl,
          durationSeconds: lesson.durationSeconds,
          position: lesson.position,
          isFree: lesson.isFree,
        })),
      })),
    };
  }

  async getLesson({
    courseSlug,
    moduleSlug,
    lessonSlug,
  }: LessonBody): Promise<LessonType | null> {
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

    return {
      title: lesson.title,
      slug: lesson.slug,
      videoUrl: lesson.videoUrl,
      durationSeconds: lesson.durationSeconds,
      position: lesson.position,
      isFree: lesson.isFree,
    };
  }
}
