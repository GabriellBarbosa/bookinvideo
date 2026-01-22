import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { Repository } from 'typeorm';
import { LessonProgressBody } from '@bookinvideo/contracts';
import { User } from '../../user/entities/user.entity';

export class UpsertLessonProgressUseCase {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(input: LessonProgressBody) {
    const seconds = Math.max(0, Math.floor(input.seconds));

    const user = await this.userRepository.findOne({
      where: { providerUserId: input.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // TODO handle lesson not found

    const existing = await this.lessonProgressRepository.findOne({
      where: {
        lessonId: input.lessonId,
        userId: user.uuid,
      },
    });

    if (!existing) {
      return this.lessonProgressRepository.save({
        userId: user.uuid,
        lessonId: input.lessonId,
        lastPositionSeconds: seconds,
        completedAt: null,
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
