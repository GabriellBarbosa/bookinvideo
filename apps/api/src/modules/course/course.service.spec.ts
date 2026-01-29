import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { LessonProgressEntity } from './entities/lesson-progress.entity';
import { UserEntity } from '../user/entities/user.entity';

describe('CourseService', () => {
  let service: CourseService;
  let courseRepo: jest.Mocked<Repository<CourseEntity>>;
  let lessonRepo: jest.Mocked<Repository<LessonEntity>>;
  let lessonProgressRepo: jest.Mocked<Repository<LessonProgressEntity>>;
  let userRepo: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LessonEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LessonProgressEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    courseRepo = module.get(getRepositoryToken(CourseEntity));
    lessonRepo = module.get(getRepositoryToken(LessonEntity));
    lessonProgressRepo = module.get(getRepositoryToken(LessonProgressEntity));
    userRepo = module.get(getRepositoryToken(UserEntity));
  });

  it('mount course structure', async () => {
    courseRepo.findOne.mockResolvedValue({
      title: 'Código Limpo na Prática',
      slug: 'clean-code',
      modules: [
        {
          title: 'Introdução',
          position: 1,
          slug: 'intro',
          lessons: [
            {
              title: 'Introdução Código Limpo',
              slug: 'clean-code-introduction',
              videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
              durationSeconds: 943,
              position: 1,
              isFree: true,
            },
          ],
        },
      ],
    } as unknown as CourseEntity);

    const result = await service.getCourseStructure('clean-code');

    expect(courseRepo.findOne).toHaveBeenCalled();
    expect(result).toEqual({
      title: 'Código Limpo na Prática',
      slug: 'clean-code',
      modules: [
        {
          title: 'Introdução',
          position: 1,
          slug: 'intro',
          lessons: [
            {
              title: 'Introdução Código Limpo',
              slug: 'clean-code-introduction',
              videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
              durationSeconds: 943,
              position: 1,
              isFree: true,
            },
          ],
        },
      ],
    });
  });

  it('course structure: return only necessary fields', async () => {
    courseRepo.findOne.mockResolvedValue({
      id: '660cbc0e-21d9-4a67-9b09-1de9cf706c81',
      slug: 'clean-code',
      title: 'Código Limpo na Prática',
      shortDescription: null,
      description:
        'Um curso prático de Clean Code inspirado em livros clássicos.',
      thumbnailUrl: null,
      introVideoUrl: null,
      estimatedHours: null,
      publishedAt: null,
      createdAt: '2026-01-08T23:57:57.842Z',
      updatedAt: '2026-01-08T23:57:57.842Z',
      modules: [
        {
          id: '06076307-ccc7-4434-b304-08f2c7bdb81f',
          courseId: '660cbc0e-21d9-4a67-9b09-1de9cf706c81',
          lessons: [
            {
              id: 'da9b748f-60f8-4e45-bf4f-b3b6b3b66580',
              slug: 'clean-code-introduction',
              courseId: '660cbc0e-21d9-4a67-9b09-1de9cf706c81',
              moduleId: '06076307-ccc7-4434-b304-08f2c7bdb81f',
              title: 'Introdução Código Limpo',
              description: null,
              videoProvider: null,
              videoId: '87e',
              videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
              durationSeconds: 943,
              position: 1,
              isFree: true,
              status: 'draft',
              publishedAt: null,
              createdAt: '2026-01-09T00:08:49.064Z',
              updatedAt: '2026-01-09T00:08:49.064Z',
            },
          ],
          title: 'Introdução',
          slug: 'intro',
          description: null,
          position: 1,
          isPublished: true,
          createdAt: '2026-01-09T00:02:49.522Z',
          updatedAt: '2026-01-09T00:02:49.522Z',
        },
      ],
    } as unknown as CourseEntity);

    const result = await service.getCourseStructure('clean-code');

    expect(courseRepo.findOne).toHaveBeenCalled();
    expect(result).toEqual({
      title: 'Código Limpo na Prática',
      slug: 'clean-code',
      modules: [
        {
          title: 'Introdução',
          position: 1,
          slug: 'intro',
          lessons: [
            {
              id: 'da9b748f-60f8-4e45-bf4f-b3b6b3b66580',
              title: 'Introdução Código Limpo',
              slug: 'clean-code-introduction',
              videoId: '87e',
              videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
              durationSeconds: 943,
              position: 1,
              isFree: true,
            },
          ],
        },
      ],
    });
  });

  it('return lesson only with the necessary fields', async () => {
    lessonRepo.findOne.mockResolvedValue({
      id: 'da9b748f-60f8-4e45-bf4f-b3b6b3b66580',
      slug: 'clean-code-introduction',
      courseId: '660cbc0e-21d9-4a67-9b09-1de9cf706c81',
      moduleId: '06076307-ccc7-4434-b304-08f2c7bdb81f',
      title: 'Introdução Código Limpo',
      description: null,
      videoProvider: null,
      videoId: '87e',
      videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
      durationSeconds: 943,
      position: 1,
      isFree: true,
      status: 'draft',
      publishedAt: null,
      createdAt: '2026-01-09T00:08:49.064Z',
      updatedAt: '2026-01-09T00:08:49.064Z',
    } as unknown as LessonEntity);

    const result = await service.getLesson({
      courseSlug: 'clean-code',
      lessonSlug: 'clean-code-introduction',
      moduleSlug: 'intro',
    });

    expect(lessonRepo.findOne).toHaveBeenCalled();
    expect(result).toEqual({
      id: 'da9b748f-60f8-4e45-bf4f-b3b6b3b66580',
      title: 'Introdução Código Limpo',
      slug: 'clean-code-introduction',
      videoId: '87e',
      videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
      durationSeconds: 943,
      position: 1,
      isFree: true,
    });
  });

  it('fill completed field when user is authenticated', async () => {
    courseRepo.findOne.mockResolvedValue({
      title: 'Código Limpo na Prática',
      slug: 'clean-code',
      modules: [
        {
          title: 'Introdução',
          position: 1,
          slug: 'intro',
          lessons: [
            {
              id: 'lesson-1',
              title: 'Introdução Código Limpo',
              slug: 'clean-code-introduction',
              videoId: '87e',
              videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
              durationSeconds: 943,
              position: 1,
              isFree: true,
            },
            {
              id: 'lesson-2',
              title: 'Princípios S.O.L.I.D',
              slug: 'solid-principles',
              videoId: 'xpto',
              videoUrl: 'https://youtu.be/xpto',
              durationSeconds: 1200,
              position: 2,
              isFree: false,
            },
          ],
        },
      ],
    } as unknown as CourseEntity);

    userRepo.findOne.mockResolvedValue({
      uuid: 'user-1',
      email: 'john@doe.com',
    } as UserEntity);

    lessonProgressRepo.find.mockResolvedValue([
      {
        lessonId: 'lesson-1',
        completedAt: new Date(),
      },
    ] as LessonProgressEntity[]);

    const result = await service.getCourseStructure('clean-code', {
      email: 'john@doe.com',
    });

    expect(result?.modules[0].lessons).toEqual([
      {
        id: 'lesson-1',
        title: 'Introdução Código Limpo',
        slug: 'clean-code-introduction',
        videoId: '87e',
        videoUrl: 'https://youtu.be/nbcfy6_v86A?si=HmTKO2b-uBpMEeUF',
        durationSeconds: 943,
        position: 1,
        isFree: true,
        completed: true,
      },
      {
        id: 'lesson-2',
        title: 'Princípios S.O.L.I.D',
        slug: 'solid-principles',
        videoId: 'xpto',
        videoUrl: 'https://youtu.be/xpto',
        durationSeconds: 1200,
        position: 2,
        isFree: false,
        completed: false,
      },
    ]);
  });
});
