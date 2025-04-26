import { EventArtist } from '@entities/event-artist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventService } from './event.service';
import { ArtistService } from 'src/modules/artist/services/artist.service';

@Injectable()
export class EventArtistService {
  constructor(
    @InjectRepository(EventArtist)
    private readonly repo: Repository<EventArtist>,

    private readonly eventService: EventService,
    private readonly artistService: ArtistService,
  ) {}

  async findAll(idEvent: number) {
    const items = await this.repo.find({
      relations: {
        artist: true,
      },
      where: {
        event: {
          id: idEvent,
        },
      },
    });
    const itemsMap = items.map((item) => {
      return {
        id: item.id,
        artistId: item.artist.id,
        artistName: item.artist.name,
      };
    });
    return itemsMap;
  }

  async create(idEvent: number, artistId: number) {
    const event = await this.eventService.findOne(idEvent);

    const artist = await this.artistService.findOne(artistId);

    const duplicateArtist = await this.repo.findOne({
      where: {
        event: {
          id: idEvent,
        },
        artist: {
          id: artistId,
        },
      },
    });

    if (duplicateArtist) {
      throw new NotFoundException('Artist already exists in this event');
    }

    const item = this.repo.create({
      event: event,
      artist: artist,
    });
    await this.repo.save(item);
    return item.id;
  }
}
