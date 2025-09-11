import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RedirectService } from './redirect.service';
import { PlatformType } from '@entities/qr-scans.entity';

@Controller()
export class RedirectController {
  constructor(private readonly qrScanService: RedirectService) {}

  @Get('r')
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    const ua = String(req.headers['user-agent'] || '');
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '';

    const isAndroid = /Android/i.test(ua);
    const isIOS = /\b(iPhone|iPad|iPod)\b/i.test(ua);

    const platform: PlatformType = isAndroid
      ? 'android'
      : isIOS
        ? 'ios'
        : 'other';

    // Guarda en MySQL
    await this.qrScanService.logScan(platform, ip);

    // Redirige
    const play =
      'https://play.google.com/store/apps/details?id=com.festiva.core';
    const appStore = 'https://apps.apple.com/no/app/festiva/id6746812825';
    const landing = 'https://festiva.app';

    const target = isAndroid ? play : isIOS ? appStore : landing;
    return res.redirect(302, target);
  }
}
