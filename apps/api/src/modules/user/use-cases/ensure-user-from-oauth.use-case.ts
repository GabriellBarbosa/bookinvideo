import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserBody } from '@bookinvideo/contracts';

@Injectable()
export class EnsureUserFromOAuthUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(profile: CreateUserBody) {
    const user = await this.userRepository.findOne({
      where: { providerUserId: profile.providerUserId },
    });

    if (user) {
      return user;
    }

    const newUser = this.userRepository.create({
      email: profile.email,
      name: profile.name,
      provider: profile.provider,
      providerUserId: profile.providerUserId,
      avatarUrl: profile.avatarUrl || undefined,
    });

    return this.userRepository.save(newUser);
  }
}
