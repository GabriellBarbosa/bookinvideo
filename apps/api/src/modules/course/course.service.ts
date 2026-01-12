import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CourseStructure } from '@bookinvideo/contracts';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
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
}
