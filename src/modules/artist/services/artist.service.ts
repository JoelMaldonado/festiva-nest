import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../../../common/entities/artist.entity';
import { CreateArtistDto } from '../../../common/dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly repo: Repository<Artist>,
  ) {}

  async findAll() {
    const list = await this.repo.find({
      relations: ['status', 'artistType'],
      where: { status: { id: 1 } },
      order: {
        createdAt: 'DESC',
      },
    });
    const listMap = list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        idArtistType: item.artistType.id,
        artistType: item.artistType.name,
        description: item.description,
        biography: item.biography,
        tags: 'Pop, Rock',
        profileUrl: item.profileUrl,
        profileCoverUrl: item.profileUrl,
        socialNetworks: [],
      };
    });
    return listMap;
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      relations: [
        'status',
        'artistType',
        'socialNetworks',
        'socialNetworks.socialNetwork',
      ],
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Artist not found');
    }
    return item;
  }

  async create(dto: CreateArtistDto) {
    const artist = this.repo.create({
      name: dto.name,
      artistType: { id: dto.idArtistType },
      description: dto.description,
      biography: dto.biography,
      profileUrl: dto.profileUrl,
      profile2Url: dto.profile2Url,
      status: { id: 1 },
    });
    await this.repo.save(artist);
    return this.findOne(artist.id);
  }

  async update(id: number, dto: CreateArtistDto) {
    const artist = await this.repo.findOne({
      where: { id },
      relations: ['status', 'artistType'],
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist.name = dto.name;
    artist.artistType.id = dto.idArtistType;
    if (dto.description) {
      artist.description = dto.description;
    }
    if (dto.biography) {
      artist.biography = dto.biography;
    }
    if (dto.profileUrl) {
      artist.profileUrl = dto.profileUrl;
    }
    await this.repo.save(artist);
    return;
  }

  async delete(id: number) {
    const artist = await this.repo.findOne({
      where: { id },
      relations: ['status'],
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist.status.id = 2;
    await this.repo.save(artist);
    return;
  }

  async restore(id: number) {
    const artist = await this.repo.findOne({
      where: { id },
      relations: ['status'],
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist.status.id = 1;
    await this.repo.save(artist);
    return;
  }
}
