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
import { Course } from './course.entity';
import { CourseModule } from './course-module.entity';

export enum LessonStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum VideoProvider {
  YOUTUBE = 'youtube',
}

export enum LessonContentType {
  VIDEO = 'video',
  TEXT = 'text',
  QUIZ = 'quiz',
  MIXED = 'mixed',
}

@Entity({ name: 'lessons' })
@Index(['moduleId', 'slug'], { unique: true })
export class Lesson {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 160, name: 'slug' })
  slug: string;

  @Column({ type: 'uuid', name: 'course_id' })
  courseId: string | null;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'uuid', name: 'module_id' })
  moduleId: string | null;

  @ManyToOne(() => CourseModule, (m) => m.lessons, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'module_id' })
  module: CourseModule | null;

  @Column({ type: 'varchar', length: 200, name: 'title' })
  title: string;

  @Column({ type: 'text', nullable: true, name: 'description' })
  description: string | null;

  @Column({
    type: 'enum',
    enum: VideoProvider,
    nullable: true,
    name: 'video_provider',
  })
  videoProvider: VideoProvider | null;

  @Column({ type: 'varchar', nullable: true, name: 'video_id' })
  videoId: string | null;

  @Column({ type: 'varchar', nullable: true, name: 'video_url' })
  videoUrl: string | null;

  @Column({ type: 'int', nullable: true, name: 'duration_seconds' })
  durationSeconds: number | null;

  @Column({ type: 'int', name: 'position' })
  position: number;

  @Column({ type: 'boolean', default: false, name: 'is_free' })
  isFree: boolean;

  @Column({
    type: 'enum',
    enum: LessonStatus,
    default: LessonStatus.DRAFT,
    name: 'status',
  })
  status: LessonStatus;

  @Column({ type: 'timestamptz', nullable: true, name: 'published_at' })
  publishedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
