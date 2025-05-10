import { ArtistTagEntity } from '@entities/artist-tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistTagService {
  constructor(
    @InjectRepository(ArtistTagEntity)
    private readonly repository: Repository<ArtistTagEntity>,
  ) {}

  async findAll(idArtist: number) {
    const items = await this.repository.find({
      where: {
        artistId: idArtist,
        status: {
          id: 1,
        },
      },
    });

    return items;
  }

  async create(idArtist: number, name: string) {
    const item = this.repository.create({
      artistId: idArtist,
      name,
      status: {
        id: 1,
      },
    });

    await this.repository.save(item);
  }

  async delete(id: number) {
    const item = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    await this.repository.remove(item);
  }
}
