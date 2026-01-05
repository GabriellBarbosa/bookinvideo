import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

export type OAuthProfile = {
  provider: 'google';
  providerUserId: string;
  email: string;
  name: string;
};

@Injectable()
export class EnsureUserFromOAuthUseCase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(profile: OAuthProfile) {
    const user = await this.userRepository.findOne({
      where: { email: profile.email },
    });

    if (!user) {
      const updatedUser = this.userRepository.create({
        email: profile.email,
        name: profile.name,
      });

      return this.userRepository.save(updatedUser);
    }

    return user;
  }
}
