import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Index({ unique: true })
  @Column({ name: 'email', length: 150 })
  email: string;

  @Column({ name: 'email_verified', default: true })
  emailVerified: boolean;

  @Column({ name: 'provider', length: 20, default: 'google' })
  provider: 'google';

  @Index()
  @Column({ name: 'provider_user_id' })
  providerUserId: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
