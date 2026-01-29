import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonProgressEntity } from '../entities/lesson-progress.entity';
import { Repository } from 'typeorm';
import { LessonProgressBody } from '@bookinvideo/contracts';
import { UserEntity } from '../../user/entities/user.entity';
import { LessonEntity } from '../entities/lesson.entity';
import { AuthUser } from '@/auth/auth-user.type';

export class UpsertLessonProgressUseCase {
  constructor(
    @InjectRepository(LessonProgressEntity)
    private readonly lessonProgressRepository: Repository<LessonProgressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  async execute(authUser: AuthUser, input: LessonProgressBody) {
    if (!authUser) {
      throw new ForbiddenException('User must be authenticated');
    }

    if (
      (input.seconds === undefined || input.seconds === 0) &&
      !input.completed
    )
      throw new Error('seconds is required unless lesson is completed');

    const seconds = Math.max(0, Math.floor(input.seconds || 0));

    const user = await this.userRepository.findOne({
      where: { email: authUser.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const lesson = await this.lessonRepository.findOne({
      where: { id: input.lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const shouldComplete =
      input.completed === true ||
      (lesson.durationSeconds != null &&
        seconds >= lesson.durationSeconds * 0.96);

    const existing = await this.lessonProgressRepository.findOne({
      where: {
        lessonId: input.lessonId,
        userId: user.uuid,
      },
    });

    if (!existing) {
      const lastPositionSeconds = shouldComplete
        ? (lesson.durationSeconds ?? seconds)
        : seconds;

      return this.lessonProgressRepository.save({
        userId: user.uuid,
        lessonId: input.lessonId,
        lastPositionSeconds,
        completedAt: shouldComplete ? new Date() : null,
      });
    }

    if (shouldComplete) {
      const lastPositionSeconds =
        lesson.durationSeconds ??
        Math.max(existing.lastPositionSeconds ?? 0, seconds);

      return this.lessonProgressRepository.update(existing.id, {
        lastPositionSeconds,
        completedAt: new Date(),
      });
    }

    const lastPositionSeconds = Math.max(
      existing.lastPositionSeconds ?? 0,
      seconds,
    );

    if (lastPositionSeconds === existing.lastPositionSeconds) return existing;

    return this.lessonProgressRepository.update(existing.id, {
      lastPositionSeconds,
    });
  }
}
