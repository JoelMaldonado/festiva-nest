import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Request, Response } from 'express';

@Controller()
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get('r')
  handleRedirect(
    @Query('src') src: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // ---- LOG SENCILLO
    const ua = req.headers['user-agent'] || '';
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '';
    console.log('Hola mundo - alguien usó el QR', {
      timestamp: new Date().toISOString(),
      src: src || 'desconocido',
      ip,
      ua,
    });

    // ---- REDIRECT (por ahora a Google)
    return res.redirect(302, 'https://google.com');
  }
  
}
