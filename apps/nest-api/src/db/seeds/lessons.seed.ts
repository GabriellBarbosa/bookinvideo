import { DataSource } from 'typeorm';
import { CourseModuleEntity } from '@/modules/course/entities/course-module.entity';
import { LessonEntity } from '@/modules/course/entities/lesson.entity';
import { CourseEntity } from '@/modules/course/entities/course.entity';

export async function seedLessons(
  dataSource: DataSource,
  modules: CourseModuleEntity[],
  course: CourseEntity,
) {
  const repo = dataSource.getRepository(LessonEntity);

  const lessonsByModule = {
    Introdução: [
      {
        title: 'Introdução Código Limpo',
        slug: 'clean-code-introduction',
        videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
        durationSeconds: 943,
        position: 1,
        isPreview: true,
      },
    ],
    'Nomes significativos': [
      {
        title: 'Nomes Significativos',
        slug: 'meaningful-names',
        videoUrl: 'https://youtu.be/4fTAr-8MQsE?si=qi7AAYRzUXYbF0ba',
        durationSeconds: 1440,
        position: 1,
        isPreview: false,
      },
    ],
  };

  for (const module of modules) {
    const lessons = lessonsByModule[module.title];
    if (!lessons) continue;

    for (const lesson of lessons) {
      const exists = await repo.findOne({
        where: { slug: lesson.slug },
      });

      if (exists) continue;

      await repo.save({
        course,
        module,
        ...lesson,
      });
    }
  }
}
