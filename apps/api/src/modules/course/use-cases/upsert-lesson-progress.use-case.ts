import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { Repository } from 'typeorm';
import { LessonProgressBody } from '@bookinvideo/contracts';
import { User } from '../../user/entities/user.entity';
import { Lesson } from '../entities/lesson.entity';

export class UpsertLessonProgressUseCase {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async execute(input: LessonProgressBody) {
    if ((input.seconds === undefined || input.seconds === 0) && !input.completed)
      throw new Error('seconds is required unless lesson is completed');

    const seconds = Math.max(0, Math.floor(input.seconds || 0));

    const user = await this.userRepository.findOne({
      where: { email: input.userEmail },
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
