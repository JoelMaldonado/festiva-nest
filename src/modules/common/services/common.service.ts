import { Artist } from '@entities/artist.entity';
import { ClubDetail } from '@entities/club-detail.entity';
import { Club } from '@entities/club.entity';
import { EventEntity } from '@entities/event.entity';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseService } from 'src/services/firebase.service';
import { IsNull, Like, MoreThanOrEqual, Not, Repository } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,

    private readonly firebaseService: FirebaseService,
  ) {}

  async search(query: string) {
    if (!query) {
      throw new BadRequestException('Debe proporcionar un término de búsqueda');
    }
    if (!query || query.trim().length < 3) {
      throw new BadRequestException(
        'El término de búsqueda debe tener al menos 3 caracteres',
      );
    }
    const searchTerm = `%${query}%`;
    const [eventos, artistas, clubs] = await Promise.all([
      this.eventRepo.find({
        select: ['id', 'title'],
        where: {
          title: Like(searchTerm),
          createdAt: MoreThanOrEqual(new Date()),
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


  async test() {
    const res = await this.firebaseService.deleteFile(
      'Photos/2025/4/1744847344420.png',
    );
    return res;
  }
}
