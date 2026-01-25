import { NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { Lesson } from '../entities/lesson.entity';
import { UpsertLessonProgressUseCase } from './upsert-lesson-progress.use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/entities/user.entity';

describe('UpsertLessonProgressUseCase', () => {
  const userEmail = 'tests@green.com';
  const lessonId = 'lesson-1';

  let useCase: UpsertLessonProgressUseCase;
  let lessonProgressRepo: jest.Mocked<Repository<LessonProgress>>;
  let lessonRepository: jest.Mocked<Repository<Lesson>>;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpsertLessonProgressUseCase,
        {
          provide: getRepositoryToken(LessonProgress),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Lesson),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpsertLessonProgressUseCase>(
      UpsertLessonProgressUseCase,
    );
    lessonProgressRepo = module.get(getRepositoryToken(LessonProgress));
    lessonRepository = module.get(getRepositoryToken(Lesson));
    userRepository = module.get(getRepositoryToken(User));

    userRepository.findOne.mockResolvedValue({
      uuid: 'user-uuid',
      email: userEmail,
    } as User);
    lessonRepository.findOne.mockResolvedValue({ id: lessonId } as Lesson);
  });

  it('throws when user does not exist', async () => {
    userRepository.findOne.mockResolvedValue(null);

    await expect(
      useCase.execute({ userEmail, lessonId, seconds: 120 }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(lessonProgressRepo.findOne).not.toHaveBeenCalled();
  });

  it('throws when lesson does not exist', async () => {
    lessonRepository.findOne.mockResolvedValue(null);

    await expect(
      useCase.execute({ userEmail, lessonId, seconds: 120 }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(lessonProgressRepo.findOne).not.toHaveBeenCalled();
  });

  it('creates progress when it does not exist', async () => {
    lessonProgressRepo.findOne.mockResolvedValue(null);

    const created = {
      id: 'p1',
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 120,
      completedAt: null,
    };

    lessonProgressRepo.save.mockResolvedValue(created as LessonProgress);

    const result = await useCase.execute({ userEmail, lessonId, seconds: 120 });

    expect(lessonProgressRepo.findOne).toHaveBeenCalledWith({
      where: {
        lessonId: lessonId,
        userId: 'user-uuid',
      },
    });
    expect(lessonProgressRepo.save).toHaveBeenCalledWith({
      userId: 'user-uuid',
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
      userId: 'user-uuid',
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

    const result = await useCase.execute({ userEmail, lessonId, seconds: 150 });

    expect(lessonProgressRepo.update).toHaveBeenCalledWith('p1', {
      lastPositionSeconds: 150,
    });
    expect(result).toEqual(updated);
  });

  it('does NOT decrease progress when user rewinds (incoming seconds is smaller)', async () => {
    const existing = {
      id: 'p1',
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 200,
      completedAt: null,
    };

    lessonProgressRepo.findOne.mockResolvedValue(existing as LessonProgress);

    const result = await useCase.execute({ userEmail, lessonId, seconds: 150 });

    expect(lessonProgressRepo.update).not.toHaveBeenCalled();
    expect(lessonProgressRepo.save).not.toHaveBeenCalled();
    expect(result).toEqual(existing);
  });

  it('floors decimals and clamps negatives to 0', async () => {
    lessonProgressRepo.findOne.mockResolvedValue(null);

    const created = {
      id: 'p1',
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 0,
      completedAt: null,
    };

    lessonProgressRepo.save.mockResolvedValue(created as LessonProgress);

    await useCase.execute({ userEmail, lessonId, seconds: -10.7 });

    expect(lessonProgressRepo.save).toHaveBeenCalledWith({
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 0,
      completedAt: null,
    });
  });

  it('throws when neither seconds nor completion flag is provided', async () => {
    await expect(
      useCase.execute({
        userEmail,
        lessonId,
        completed: false,
        seconds: undefined,
      }),
    ).rejects.toBeInstanceOf(Error);

    expect(lessonProgressRepo.findOne).not.toHaveBeenCalled();
    expect(lessonProgressRepo.save).not.toHaveBeenCalled();
    expect(lessonProgressRepo.update).not.toHaveBeenCalled();
  });

  // TODO seconds are 98% of duration of the lesson or completed is true. Mark lesson as completed and set the lesson "durationSeconds" value to "lastPositionSeconds"
});
