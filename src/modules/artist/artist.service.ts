import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

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
}
