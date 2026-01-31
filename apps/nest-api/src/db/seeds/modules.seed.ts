// src/database/seeds/modules.seed.ts
import { DataSource } from 'typeorm';
import { CourseEntity } from '@/modules/course/entities/course.entity';
import { CourseModuleEntity } from '@/modules/course/entities/course-module.entity';

export async function seedModules(
  dataSource: DataSource,
  course: CourseEntity,
) {
  const repo = dataSource.getRepository(CourseModuleEntity);

  const modulesData = [
    { title: 'Introdução', position: 1, slug: 'intro' },
    { title: 'Nomes significativos', position: 2, slug: 'meaningful-names' },
    { title: 'Funções', position: 3, slug: 'functions' },
  ];

  const modules: CourseModuleEntity[] = [];

  for (const data of modulesData) {
    const exists = await repo.findOne({
      where: { course: { id: course.id }, title: data.title },
      relations: ['course'],
    });

    if (exists) {
      modules.push(exists);
      continue;
    }

    const module = await repo.save({
      course,
      title: data.title,
      position: data.position,
      slug: data.slug,
    });

    modules.push(module);
  }

  return modules;
}
