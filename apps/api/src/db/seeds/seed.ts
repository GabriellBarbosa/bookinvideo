import dataSource from '../datasource';
import { seedCourses } from './courses.seed';
import { seedModules } from './modules.seed';
import { seedLessons } from './lessons.seed';

async function run() {
  await dataSource.initialize();

  const course = await seedCourses(dataSource);
  const modules = await seedModules(dataSource, course);
  await seedLessons(dataSource, modules, course);

  await dataSource.destroy();
}

run()
  .then(() => {
    console.log('🌱 Database seeded successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed error', err);
    process.exit(1);
  });
