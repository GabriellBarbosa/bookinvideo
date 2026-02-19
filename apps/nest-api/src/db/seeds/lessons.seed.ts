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
    'Testes unitários': [
      {
        title: 'Testes unitários',
        slug: 'unit-tests',
        videoUrl: 'https://youtu.be/zeNXrKBXGrw?si=SM5wXa7OWzXyZSvq',
        durationSeconds: 1141,
        position: 1,
        isPreview: false,
        videoId: 'zeNXrKBXGrw',
      },
      {
        title: 'Construir operar verificar',
        slug: 'construir-operar-verificar',
        videoUrl: 'https://youtu.be/sFyQokVbXPs?si=myAuQ7jWjKos6n60',
        durationSeconds: 294,
        position: 2,
        isPreview: false,
        videoId: 'sFyQokVbXPs',
      },
      {
        title: 'Testes limpos',
        slug: 'clean-tests',
        videoUrl: 'https://youtu.be/I7d4YdJqYdQ?si=-jXCwuPfvBLuaMU7',
        durationSeconds: 279,
        position: 3,
        isPreview: false,
        videoId: 'I7d4YdJqYdQ',
      },
      {
        title: 'Mais sobre testes',
        slug: 'more-about-tests',
        videoUrl: 'https://youtu.be/Ojxxrr-Oh7U?si=6b8YBKMrtVwRBinU',
        durationSeconds: 690,
        position: 4,
        isPreview: false,
        videoId: 'Ojxxrr-Oh7U',
      },
    ],
    Classes: [
      {
        title: 'Classes',
        slug: 'classes',
        videoUrl: 'https://youtu.be/riRcsIckEj8?si=M6YZPapEVwrdvPSC',
        durationSeconds: 441,
        position: 1,
        isPreview: false,
        videoId: 'riRcsIckEj8',
      },
      {
        title: 'Dividindo classe',
        slug: 'splitting-class',
        videoUrl: 'https://youtu.be/SL04XDumi-Y?si=O1n8EKMqoNyXS4Q1',
        durationSeconds: 1633,
        position: 2,
        isPreview: false,
        videoId: 'SL04XDumi-Y',
      },
      {
        title: 'Coesão',
        slug: 'cohesion',
        videoUrl: 'https://youtu.be/ywCyLk9qTz4?si=tu-GfTmXxYQdoT3G',
        durationSeconds: 326,
        position: 3,
        isPreview: false,
        videoId: 'ywCyLk9qTz4',
      },
      {
        title: 'Objetos e estruturas de dados',
        slug: 'objects-and-data-structures',
        videoUrl: 'https://youtu.be/Coamml-z4o4?si=RZVPpo5GWMQ54zZW',
        durationSeconds: 920,
        position: 4,
        isPreview: false,
        videoId: 'Coamml-z4o4',
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
