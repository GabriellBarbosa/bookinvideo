import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EnsureUserFromOAuthUseCase } from './use-cases/ensure-user-from-oauth.use-case';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [EnsureUserFromOAuthUseCase],
  controllers: [UserController],
})
export class UserModule {}
