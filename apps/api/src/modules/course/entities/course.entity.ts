import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 160, unique: true, name: 'slug' })
  slug: string;

  @Column({ type: 'varchar', length: 200, name: 'title' })
  title: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    name: 'short_description',
  })
  shortDescription: string | null;

  @Column({ type: 'text', nullable: true, name: 'description' })
  description: string | null;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: true,
    name: 'thumbnail_url',
  })
  thumbnailUrl: string | null;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: true,
    name: 'intro_video_url',
  })
  introVideoUrl: string | null;

  @Column({ type: 'int', nullable: true, name: 'estimated_hours' })
  estimatedHours: number | null;

  @Column({ type: 'timestamptz', nullable: true, name: 'published_at' })
  publishedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
