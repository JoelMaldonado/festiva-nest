import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class RedirectController {
  @Get('r')
  handleRedirect(@Req() req: Request, @Res() res: Response) {
    // --- Headers útiles
    const ua = String(req.headers['user-agent'] || '');
    // Client Hints (cuando el navegador los manda)
    const chPlatform = cleanHeader(req.headers['sec-ch-ua-platform']);
    const chMobile = cleanHeader(req.headers['sec-ch-ua-mobile']); // "?1" en móviles Chromium
    const referer = String(req.headers['referer'] || '');

    // IP (si usas proxy/CDN confía en x-forwarded-for)
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '';

    // --- Detección simple y robusta (sin librerías)
    // 1) Client Hints primero (más confiable si están presentes)
    const hintAndroid = /Android/i.test(chPlatform);
    const hintIOS = /iOS|iPadOS/i.test(chPlatform); // algunos navegadores reportan iPadOS

    // 2) Fallback con User-Agent
    const uaAndroid = /Android/i.test(ua);
    // iPhone/iPad/iPod cubren iOS; iPadOS modernos siguen mostrando "iPad"
    const uaiOS = /\b(iPhone|iPad|iPod)\b/i.test(ua);

    const isAndroid = hintAndroid || uaAndroid;
    const isIOS = hintIOS || uaiOS;

    const platform = isAndroid ? 'android' : isIOS ? 'ios' : 'other';
    const isMobile =
      chMobile === '?1' ||
      /Mobile/i.test(ua) ||
      /Android|iPhone|iPad|iPod/i.test(ua);

    // --- Log mínimo “fácil de obtener”
    console.log('Hola mundo - alguien usó el QR', {
      timestamp: new Date().toISOString(),
      ip,
      platform, // android | ios | other
      isMobile, // true/false
      chPlatform, // Client Hint, si vino
      chMobile, // Client Hint, si vino
      ua, // User-Agent bruto (útil para depurar)
      referer,
    });

    // --- Destinos
    const play =
      'https://play.google.com/store/apps/details?id=com.festiva.core&pcampaignid=web_share';
    const appStore = 'https://apps.apple.com/us/app/festiva/id6746812825';
    const landing = 'https://festiva.no';
    const target = isAndroid ? play : isIOS ? appStore : landing;
    return res.redirect(302, target);
  }
}

// Limpia headers que pueden venir entrecomillados o como array
function cleanHeader(h: string | string[] | undefined): string {
  if (!h) return '';
  const v = Array.isArray(h) ? h[0] : h;
  return v.replace(/^"+|"+$/g, '').trim(); // quita comillas dobles
}
