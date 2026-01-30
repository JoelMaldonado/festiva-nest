import { Controller, Get, Res } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { Response } from 'express';

@Controller()
export class SitemapController {
  constructor(private readonly service: SitemapService) {}
  @Get('sitemap.xml')
  async getSitemap(@Res() res: Response) {
    const xml = await this.service.buildSitemapXml();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(xml);
  }
}
