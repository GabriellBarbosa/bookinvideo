import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Entity({ name: 'course_modules' })
@Index(['courseId', 'slug'], { unique: true })
export class CourseModule {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'course_id' })
  courseId: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];

  @Column({ type: 'varchar', length: 200, name: 'title' })
  title: string;

  @Column({ type: 'varchar', length: 160, name: 'slug' })
  slug: string;

  @Column({ type: 'text', nullable: true, name: 'description' })
  description: string | null;

  @Column({ type: 'int', name: 'position' })
  position: number;

  @Column({ type: 'boolean', default: true, name: 'is_published' })
  isPublished: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
