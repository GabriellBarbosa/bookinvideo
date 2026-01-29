import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'lesson_progress' })
@Index(['userId', 'lessonId'], { unique: true })
export class LessonProgressEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'uuid', name: 'lesson_id' })
  lessonId: string;

  @ManyToOne(() => LessonEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity;

  @Column({ type: 'int', nullable: true, name: 'last_position_seconds' })
  lastPositionSeconds: number | null;

  @Column({ type: 'timestamptz', nullable: true, name: 'completed_at' })
  completedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
