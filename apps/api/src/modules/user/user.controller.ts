import { Body, Controller, Post } from '@nestjs/common';
import { EnsureUserFromOAuthUseCase } from './use-cases/ensure-user-from-oauth.use-case';
import { CreateUserBodySchema, type CreateUserBody } from '@bookinvideo/contracts';

@Controller('user')
export class UserController {
  constructor(
    private readonly ensureUserFromOAuthUseCase: EnsureUserFromOAuthUseCase,
  ) {}
  @Post('/ensure-from-oauth')
  async ensureUserFromOauth(@Body() user: CreateUserBody) {
    const parsed = CreateUserBodySchema.parse(user);
    await this.ensureUserFromOAuthUseCase.execute(parsed);
  }
}
