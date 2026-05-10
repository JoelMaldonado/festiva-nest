import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity, EventScheduleEntity } from '@entities/event.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(EventScheduleEntity)
    private readonly scheduleRepository: Repository<EventScheduleEntity>,
  ) {}

  async buildSitemapXml() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const schedules = await this.scheduleRepository.find({
      select: {
        event: { id: true, title: true, updatedAt: true, createdAt: true },
      },
      where: {
        eventDate: MoreThanOrEqual(today),
        statusId: 1,
        event: { status: { id: 1 } },
      },
      relations: { event: true },
    });

    // Deduplicate: keep one entry per event (the one with the earliest upcoming date)
    const seen = new Map<number, EventEntity>();
    for (const s of schedules) {
      if (!seen.has(s.event.id)) {
        seen.set(s.event.id, s.event);
      }
    }

    const events = [...seen.values()];

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
