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
      {
        title: 'Motivos das decisões',
        slug: 'reasons-for-decisions',
        videoUrl: 'https://youtu.be/RowB_KsrHsg?si=vDDx9Y_T1MYLn0sn',
        durationSeconds: 469,
        position: 2,
        isPreview: false,
        videoId: 'RowB_KsrHsg',
      },
      {
        title: 'Mais regras',
        slug: 'more-rules',
        videoUrl: 'https://youtu.be/SPVQeqUnIiY?si=c5bXViR3bngjg_V5',
        durationSeconds: 612,
        position: 3,
        isPreview: false,
        videoId: 'SPVQeqUnIiY',
      },
      {
        title: 'Exercício',
        slug: 'meaningful-names-test',
        videoUrl: 'https://youtu.be/1lnDDWRapQE?si=wNTOhAQo_UeGIAeA',
        durationSeconds: 935,
        position: 4,
        isPreview: false,
        videoId: '1lnDDWRapQE',
      },
    ],
    Funções: [
      {
        title: 'Funções',
        slug: 'functions',
        videoUrl: 'https://youtu.be/fcsY4gt7gNs?si=Ri9jrU1Z8fAsPUXp',
        durationSeconds: 781,
        position: 1,
        isPreview: false,
        videoId: 'fcsY4gt7gNs',
      },
      {
        title: 'Regras',
        slug: 'functions-rules',
        videoUrl: 'https://youtu.be/LmeLZriFJAg?si=1VQRUPUeCOgpEj5t',
        durationSeconds: 352,
        position: 2,
        isPreview: false,
        videoId: 'LmeLZriFJAg',
      },
      {
        title: 'Parâmetros',
        slug: 'parameters',
        videoUrl: 'https://youtu.be/Lda-RUeeLjQ?si=RiVet9Qc_oUv9wIs',
        durationSeconds: 647,
        position: 3,
        isPreview: false,
        videoId: 'Lda-RUeeLjQ',
      },
      {
        title: 'Evite surpresas',
        slug: 'avoid-surprises',
        videoUrl: 'https://youtu.be/QgjL9W9sHfI?si=O8H2SGo6UO_IHed6',
        durationSeconds: 272,
        position: 4,
        isPreview: false,
        videoId: 'QgjL9W9sHfI',
      },
      {
        title: 'Tratamento de erro',
        slug: 'error-handling',
        videoUrl: 'https://youtu.be/yZRn6SHnCDk?si=F_cXsYJavB8tjRml',
        durationSeconds: 191,
        position: 5,
        isPreview: false,
        videoId: 'yZRn6SHnCDk',
      },
      {
        title: 'Open-Closed Principle (OCP)',
        slug: 'open-closed-principle',
        videoUrl: 'https://youtu.be/mdoO9STeBgc?si=Dsan6Ed1oER8jX45',
        durationSeconds: 908,
        position: 6,
        isPreview: false,
        videoId: 'mdoO9STeBgc',
      },
      {
        title: 'Funções exercício parte 1',
        slug: 'functions-test-part-1',
        videoUrl: 'https://youtu.be/mdoO9STeBgc?si=Dsan6Ed1oER8jX45',
        durationSeconds: 908,
        position: 7,
        isPreview: false,
        videoId: 'mdoO9STeBgc',
      },
      {
        title: 'Funções exercício pt. 2',
        slug: 'functions-test-part-2',
        videoUrl: 'https://youtu.be/CWRe9453ayo?si=rgQc3FQsWair_nO5',
        durationSeconds: 2056,
        position: 8,
        isPreview: false,
        videoId: 'CWRe9453ayo',
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
