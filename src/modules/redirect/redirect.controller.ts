import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RedirectService } from './redirect.service';
import { PlatformType } from '@entities/qr-scans.entity';

@Controller()
export class RedirectController {
  constructor(private readonly qrScanService: RedirectService) {}

  @Get('nacho')
  async nacho(@Query('url') url: string, @Res() res: Response) {
    if (!url) {
      return res.status(400).send('Missing url');
    }
    const png = await this.qrScanService.makePngWithLogoBox(url, 1024, 0.22);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.send(png);
  }

  @Get('r')
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    const ua = String(req.headers['user-agent'] || '');

    const isAndroid = /Android/i.test(ua);
    const isIOS = /\b(iPhone|iPad|iPod)\b/i.test(ua);

    const platform: PlatformType = isAndroid
      ? 'android'
      : isIOS
        ? 'ios'
        : 'other';

    // Guarda en MySQL
    await this.qrScanService.logScan(platform);

    // Redirige
    const play =
      'https://play.google.com/store/apps/details?id=com.festiva.core';
    const appStore = 'https://apps.apple.com/no/app/festiva/id6746812825';
    const landing = 'https://festiva.app';

    const target = isAndroid ? play : isIOS ? appStore : landing;
    return res.redirect(302, target);
  }
}
