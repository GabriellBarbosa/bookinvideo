import { DataSource } from 'typeorm';
import { Course } from '@/modules/course/entities/course.entity';

export async function seedCourses(dataSource: DataSource) {
  const repo = dataSource.getRepository(Course);

  const slug = 'clean-code';

  const exists = await repo.findOne({ where: { slug } });

  if (exists) return exists;

  return repo.save({
    slug,
    title: 'Código Limpo na Prática',
    description:
      'Um curso prático de Clean Code inspirado em livros clássicos.',
    isPublished: true,
  });
}
