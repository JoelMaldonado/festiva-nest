import { Injectable } from '@nestjs/common';
import { EventService } from '../event/services/event.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '@entities/event.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
  ) {}

  async generateSitemap() {
    const events = await this.repository.find();

    // Logic to generate sitemap XML from events
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${events
  .map(
    (event) => `
  <url>
    <loc>https://www.example.com/events/${event.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`,
  )
  .join('')}
</urlset>`;

    return sitemapXml;
  }

  async buildSitemapXml() {
    const since = new Date();
    since.setDate(since.getDate() - 90);

    const events = await this.repository.find({
      select: { id: true, title: true, createdAt: true },
      where: {
        createdAt: MoreThanOrEqual(since),
        status: { id: 1 },
      },
      order: { createdAt: 'DESC' },
    });

    const base = 'https://app.festiva.no';

    const body = events
      .map((e) => {
        const slug = slugify(e.title);
        const lastmodDate = (e.updatedAt ?? e.createdAt)
          ?.toISOString()
          .slice(0, 10); // YYYY-MM-DD
        return `
  <url>
    <loc>${base}/events/${e.id}/${slug}</loc>
    ${lastmodDate ? `<lastmod>${lastmodDate}</lastmod>` : ''}
  </url>`;
      })
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}
</urlset>`;
  }
}

function slugify(input: string) {
  return (input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[^a-z0-9]+/g, '-') // espacios/símbolos => "-"
    .replace(/(^-|-$)+/g, '') // recorta "-"
    .slice(0, 90); // opcional
}
