import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserBody } from '@bookinvideo/contracts';

@Injectable()
export class EnsureUserFromOAuthUseCase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(profile: CreateUserBody) {
    const user = await this.userRepository.findOne({
      where: { email: profile.email },
    });

    if (!user) {
      const updatedUser = this.userRepository.create({
        email: profile.email,
        name: profile.name,
        provider: profile.provider,
        providerUserId: profile.providerUserId,
        avatarUrl: profile.avatarUrl || undefined,
      });

      return this.userRepository.save(updatedUser);
    }

    return user;
  }
}
