import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EnsureUserFromOAuthUseCase } from './use-cases/ensure-user-from-oauth.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [EnsureUserFromOAuthUseCase],
})
export class UserModule {}
