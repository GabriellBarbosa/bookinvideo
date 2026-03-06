import { Controller, Param, Sse } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { map } from 'rxjs';
import { User } from '@/auth/user.decorator';
import { type AuthUser } from '@/auth/auth-user.type';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Sse('stream/:courseSlug')
  stream(@Param('courseSlug') courseSlug: string, @User() user: AuthUser) {
    if (!user?.email) {
      return;
    }

    const key = this.certificateService.getStreamKey(user.email, courseSlug);

    return this.certificateService.stream(key).pipe(
      map((evt) => ({
        type: evt.type,
        data: evt.data,
      })),
    );
  }
}
