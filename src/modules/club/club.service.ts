import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './entites/club.entity';
import { Repository } from 'typeorm';
import { ClubContact } from './entites/club-contact.entity';
import { ClubCover } from './entites/club-cover.entity';
import { ClubLocation } from './entites/club-location.entity';
import { ClubSocialNetwork } from './entites/club-social-network.entity';
import { ClubDto } from './dto/club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubContact)
    private readonly clubContactRepo: Repository<ClubContact>,
    @InjectRepository(ClubCover)
    private readonly clubCoverRepo: Repository<ClubCover>,
    @InjectRepository(ClubLocation)
    private readonly clubLocationRepo: Repository<ClubLocation>,
    @InjectRepository(ClubSocialNetwork)
    private readonly clubSocialNetworkRepo: Repository<ClubSocialNetwork>,
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  async create(dto: ClubDto) {
    const itemCreate = this.clubRepo.create(dto);
    await this.clubRepo.save(itemCreate);
    return itemCreate;
  }

  async findAllAddress() {
    const locations = await this.clubLocationRepo.find({
      relations: ['club'],
      where: {
        status: { id: 1 },
      },
    });

    const locationsMap = locations.map((location) => {
      return {
        idClub: location.club.id,
        club: location.club.name,
        logoUrl: location.club.logoUrl,
        address: location.address,
        latitude: location.latitude !== null ? Number(location.latitude) : null,
        longitude:
          location.longitude !== null ? Number(location.longitude) : null,
        mapsUrl: location.mapsUrl,
      };
    });
    return locationsMap;
  }

  async findAll() {
    return await this.clubRepo.find({
      where: {
        status: { id: 1 },
      },
    });
  }

  async findOne(id: number) {
    const item = await this.clubRepo.findOne({
      where: {
        id,
        status: { id: 1 },
      },
    });
    if (!item) {
      throw new NotFoundException(`Club with id ${id} not found`);
    }
    return item;
  }
}
