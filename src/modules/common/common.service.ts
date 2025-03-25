import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Event } from '../event/entities/event.entity';
import { Club } from '../club/entites/club.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  async search(query: string) {
    const searchTerm = `%${query}%`;
    const [eventos, artistas, clubs] = await Promise.all([
      this.eventRepo.find({
        select: ['id', 'title'],
        where: {
          title: Like(searchTerm),
        },
        take: 5,
      }),
      this.artistRepo.find({
        select: ['id', 'name'],
        where: {
          name: Like(searchTerm),
        },
        take: 5,
      }),
      this.clubRepo.find({
        select: ['id', 'name'],
        where: {
          name: Like(searchTerm),
        },
        take: 5,
      }),
    ]);

    return [
      ...eventos.map((e) => ({ id: e.id, detail: e.title, type: 'E' })),
      ...artistas.map((a) => ({ id: a.id, detail: a.name, type: 'A' })),
      ...clubs.map((d) => ({ id: d.id, detail: d.name, type: 'C' })),
    ];
  }
}
