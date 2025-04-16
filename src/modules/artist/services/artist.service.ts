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
    const list = await this.repo.find();
    return list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        artistType: 'Singer',
        description: item.description,
        biography: item.biography,
        tags: 'Pop, Rock',
        profileUrl: item.profileUrl,
        profileCoverUrl: item.profileUrl,
        socialNetworks: [],
      };
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Artist not found');
    }
    return {
      id: item.id,
      name: item.name,
      artistType: 'Singer',
      description: item.description,
      biography: item.biography,
      tags: 'Pop, Rock',
      profileUrl: item.profileUrl,
      profileCoverUrl: item.profileUrl,
      socialNetworks: [],
    };
  }

  async create(dto: CreateArtistDto) {
    const artist = this.repo.create({
      name: dto.name,
      artistType: { id: dto.idArtistType },
      description: dto.description,
      biography: dto.biography,
      profileUrl: dto.profileUrl,
      status: { id: 1 },
    });
    await this.repo.save(artist);
    return this.findOne(artist.id);
  }
}
