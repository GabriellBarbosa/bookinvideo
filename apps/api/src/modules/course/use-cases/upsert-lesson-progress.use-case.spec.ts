import { NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { LessonProgressEntity } from '../entities/lesson-progress.entity';
import { LessonEntity } from '../entities/lesson.entity';
import { UpsertLessonProgressUseCase } from './upsert-lesson-progress.use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../user/entities/user.entity';

describe('UpsertLessonProgressUseCase', () => {
  const userEmail = 'tests@green.com';
  const lessonId = 'lesson-1';

  let useCase: UpsertLessonProgressUseCase;
  let lessonProgressRepo: jest.Mocked<Repository<LessonProgressEntity>>;
  let lessonRepository: jest.Mocked<Repository<LessonEntity>>;
  let userRepository: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpsertLessonProgressUseCase,
        {
          provide: getRepositoryToken(LessonProgressEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LessonEntity),
          useValue: {
            findOne: jest.fn(),
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

    useCase = module.get<UpsertLessonProgressUseCase>(
      UpsertLessonProgressUseCase,
    );
    lessonProgressRepo = module.get(getRepositoryToken(LessonProgressEntity));
    lessonRepository = module.get(getRepositoryToken(LessonEntity));
    userRepository = module.get(getRepositoryToken(UserEntity));

    userRepository.findOne.mockResolvedValue({
      uuid: 'user-uuid',
      email: userEmail,
    } as UserEntity);
    lessonRepository.findOne.mockResolvedValue({
      id: lessonId,
      durationSeconds: 200,
    } as LessonEntity);
  });

  it('throws when user does not exist', async () => {
    userRepository.findOne.mockResolvedValue(null);

    await expect(
      useCase.execute(
        { email: userEmail },
        { lessonId, seconds: 120 },
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(lessonProgressRepo.findOne).not.toHaveBeenCalled();
  });

  it('throws when lesson does not exist', async () => {
    lessonRepository.findOne.mockResolvedValue(null);

    await expect(
      useCase.execute(
        { email: userEmail },
        { lessonId, seconds: 120 },
      ),
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

    lessonProgressRepo.save.mockResolvedValue(created as LessonProgressEntity);

    const result = await useCase.execute(
      { email: userEmail },
      { lessonId, seconds: 120 },
    );

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

    lessonProgressRepo.findOne.mockResolvedValue(existing as LessonProgressEntity);

    const updated = {
      ...existing,
      lastPositionSeconds: 150,
    };

    lessonProgressRepo.update.mockResolvedValue(
      updated as unknown as UpdateResult,
    );

    const result = await useCase.execute(
      { email: userEmail },
      { lessonId, seconds: 150 },
    );

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

    lessonProgressRepo.findOne.mockResolvedValue(existing as LessonProgressEntity);

    const result = await useCase.execute(
      { email: userEmail },
      { lessonId, seconds: 150 },
    );

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

    lessonProgressRepo.save.mockResolvedValue(created as LessonProgressEntity);

    await useCase.execute(
      { email: userEmail },
      { lessonId, seconds: -10.7 },
    );

    expect(lessonProgressRepo.save).toHaveBeenCalledWith({
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 0,
      completedAt: null,
    });
  });

  it('throws when neither seconds nor completion flag is provided', async () => {
    await expect(
      useCase.execute(
        { email: userEmail },
        {
          lessonId,
          completed: false,
          seconds: undefined,
        },
      ),
    ).rejects.toBeInstanceOf(Error);

    expect(lessonProgressRepo.findOne).not.toHaveBeenCalled();
    expect(lessonProgressRepo.save).not.toHaveBeenCalled();
    expect(lessonProgressRepo.update).not.toHaveBeenCalled();
  });

  it('marks lesson as completed when reaching 96% of duration', async () => {
    const existing = {
      id: 'p1',
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 100,
      completedAt: null,
    };

    lessonProgressRepo.findOne.mockResolvedValue(existing as LessonProgressEntity);

    const updated = {
      ...existing,
      lastPositionSeconds: 200,
      completedAt: new Date(),
    };

    lessonProgressRepo.update.mockResolvedValue(
      updated as unknown as UpdateResult,
    );

    const result = await useCase.execute(
      { email: userEmail },
      {
        lessonId,
        seconds: 195,
      },
    );

    expect(lessonProgressRepo.update).toHaveBeenCalledWith('p1', {
      lastPositionSeconds: 200,
      completedAt: expect.any(Date),
    });
    expect(result).toEqual(updated);
  });

  it('save lesson as completed when completed flag is true', async () => {
    lessonProgressRepo.findOne.mockResolvedValue(null);
    lessonRepository.findOne.mockResolvedValue({
      id: 'p1',
      durationSeconds: 1000,
    } as LessonEntity);
    lessonProgressRepo.save.mockImplementation(
      async (data) => data as LessonProgressEntity,
    );

    await useCase.execute(
      { email: userEmail },
      {
        lessonId,
        completed: true,
        seconds: undefined,
      },
    );

    expect(lessonProgressRepo.save).toHaveBeenCalledWith({
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 1000,
      completedAt: expect.any(Date),
    });
  });

  it('update lesson to completed when completed flag is true', async () => {
    lessonProgressRepo.findOne.mockResolvedValue({
      id: 'p1',
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 100,
      completedAt: null,
    } as LessonProgressEntity);
    lessonRepository.findOne.mockResolvedValue({
      id: 'p1',
      durationSeconds: 1000,
    } as LessonEntity);
    lessonProgressRepo.save.mockImplementation(
      async (data) => data as LessonProgressEntity,
    );

    await useCase.execute(
      { email: userEmail },
      {
        lessonId,
        completed: true,
        seconds: undefined,
      },
    );

    expect(lessonProgressRepo.update).toHaveBeenCalledWith('p1', {
      lastPositionSeconds: 1000,
      completedAt: expect.any(Date),
    });
  });

  it('save lesson as completed when seconds are 96% of lesson duration', async () => {
    lessonProgressRepo.findOne.mockResolvedValue(null);
    lessonRepository.findOne.mockResolvedValue({
      id: 'p1',
      durationSeconds: 1000,
    } as LessonEntity);
    lessonProgressRepo.save.mockImplementation(
      async (data) => data as LessonProgressEntity,
    );

    await useCase.execute(
      { email: userEmail },
      {
        lessonId,
        seconds: 960,
      },
    );

    expect(lessonProgressRepo.save).toHaveBeenCalledWith({
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 1000,
      completedAt: expect.any(Date),
    });
  });

  it('update lesson to completed when seconds are 96% of lesson duration', async () => {
    lessonProgressRepo.findOne.mockResolvedValue({
      id: 'p1',
      userId: 'user-uuid',
      lessonId,
      lastPositionSeconds: 100,
      completedAt: null,
    } as LessonProgressEntity);
    lessonRepository.findOne.mockResolvedValue({
      id: 'p1',
      durationSeconds: 1000,
    } as LessonEntity);
    lessonProgressRepo.save.mockImplementation(
      async (data) => data as LessonProgressEntity,
    );

    await useCase.execute(
      { email: userEmail },
      {
        lessonId,
        seconds: 960,
      },
    );

    expect(lessonProgressRepo.update).toHaveBeenCalledWith('p1', {
      lastPositionSeconds: 1000,
      completedAt: expect.any(Date),
    });
  });
});
