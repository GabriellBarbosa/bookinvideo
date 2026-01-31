import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthUser } from './auth-user.type';

@Injectable()
export class ProxyAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<any>();
    const email = req.headers['x-user-email'];
    const internalApiKey = req.headers['x-internal-key'];

    if (
      email &&
      process.env.INTERNAL_API_KEY &&
      internalApiKey === process.env.INTERNAL_API_KEY
    ) {
      const user: AuthUser = {
        email: String(email),
      };

      req.user = user;
    }

    return true;
  }
}
