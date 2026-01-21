import { Repository, UpdateResult } from 'typeorm';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { UpsertLessonProgressUseCase } from './upsert-lesson-progress.use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('UpsertLessonProgressUseCase', () => {
  const userId = 'user-1';
  const lessonId = 'lesson-1';

  let useCase: UpsertLessonProgressUseCase;
  let lessonProgressRepo: jest.Mocked<Repository<LessonProgress>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpsertLessonProgressUseCase,
        {
          provide: getRepositoryToken(LessonProgress),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpsertLessonProgressUseCase>(
      UpsertLessonProgressUseCase,
    );
    lessonProgressRepo = module.get(getRepositoryToken(LessonProgress));
  });

  it('creates progress when it does not exist', async () => {
    lessonProgressRepo.findOne.mockResolvedValue(null);

    const created = {
      id: 'p1',
      userId,
      lessonId,
      lastPositionSeconds: 120,
      completedAt: null,
    };

    lessonProgressRepo.create.mockReturnValue(created as LessonProgress);

    const result = await useCase.execute({ userId, lessonId, seconds: 120 });

    expect(lessonProgressRepo.findOne).toHaveBeenCalledWith({
      where: {
        userId: userId,
        lessonId: lessonId,
      },
    });
    expect(lessonProgressRepo.create).toHaveBeenCalledWith({
      userId,
      lessonId,
      lastPositionSeconds: 120,
      completedAt: null,
    });
    expect(lessonProgressRepo.update).not.toHaveBeenCalled();
    expect(result).toEqual(created);
  });

  it('updates progress when incoming seconds is greater', async () => {
    const existing = {
      id: 'p1',
      userId,
      lessonId,
      lastPositionSeconds: 100,
      completedAt: null,
    };

    lessonProgressRepo.findOne.mockResolvedValue(existing as LessonProgress);

    const updated = {
      ...existing,
      lastPositionSeconds: 150,
    };

    lessonProgressRepo.update.mockResolvedValue(
      updated as unknown as UpdateResult,
    );

    const result = await useCase.execute({ userId, lessonId, seconds: 150 });

    expect(lessonProgressRepo.update).toHaveBeenCalledWith('p1', {
      lastPositionSeconds: 150,
    });
    expect(result).toEqual(updated);
  });

  it('does NOT decrease progress when user rewinds (incoming seconds is smaller)', async () => {
    const existing = {
      id: 'p1',
      userId,
      lessonId,
      lastPositionSeconds: 200,
      completedAt: null,
    };

    lessonProgressRepo.findOne.mockResolvedValue(existing as LessonProgress);

    const result = await useCase.execute({ userId, lessonId, seconds: 150 });

    expect(lessonProgressRepo.update).not.toHaveBeenCalled();
    expect(lessonProgressRepo.create).not.toHaveBeenCalled();
    expect(result).toEqual(existing);
  });

  it('floors decimals and clamps negatives to 0', async () => {
    lessonProgressRepo.findOne.mockResolvedValue(null);

    const created = {
      id: 'p1',
      userId,
      lessonId,
      lastPositionSeconds: 0,
      completedAt: null,
    };

    lessonProgressRepo.create.mockReturnValue(created as LessonProgress);

    await useCase.execute({ userId, lessonId, seconds: -10.7 });

    expect(lessonProgressRepo.create).toHaveBeenCalledWith({
      userId,
      lessonId,
      lastPositionSeconds: 0,
      completedAt: null,
    });
  });
});
