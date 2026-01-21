import { InjectRepository } from '@nestjs/typeorm';
import { LessonProgress } from '../entities/lesson-progress.entity';
import { Repository } from 'typeorm';

export class UpsertLessonProgressUseCase {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>,
  ) {}

  async execute(input: { userId: string; lessonId: string; seconds: number }) {
    const seconds = Math.max(0, Math.floor(input.seconds));

    const existing = await this.lessonProgressRepository.findOne({
      where: {
        lessonId: input.lessonId,
        userId: input.userId,
      },
    });

    if (!existing) {
      return this.lessonProgressRepository.create({
        userId: input.userId,
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
