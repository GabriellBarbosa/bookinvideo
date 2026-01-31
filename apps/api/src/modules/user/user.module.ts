import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EnsureUserFromOAuthUseCase } from './use-cases/ensure-user-from-oauth.use-case';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [EnsureUserFromOAuthUseCase],
  controllers: [UserController],
})
export class UserModule {}
