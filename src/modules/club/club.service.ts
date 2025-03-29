import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './entites/club.entity';
import { Repository } from 'typeorm';
import { ClubContact } from './entites/club-contact.entity';
import { ClubCover } from './entites/club-cover.entity';
import { ClubLocation } from './entites/club-location.entity';
import { ClubSocialNetwork } from './entites/club-social-network.entity';
import { ClubDto } from './dto/club.dto';
import { ClubSchedule } from './entites/club-schedule.entity';
import { find } from 'rxjs';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubLocation)
    private readonly clubLocationRepo: Repository<ClubLocation>,
    @InjectRepository(ClubSchedule)
    private readonly clubScheduleRepo: Repository<ClubSchedule>,
    @InjectRepository(ClubContact)
    private readonly clubContactRepo: Repository<ClubContact>,
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

  async findOneLocation(id: number) {
    const location = await this.clubLocationRepo.findOne({
      relations: ['club'],
      where: {
        club: { id: id },
        status: { id: 1 },
      },
    });

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

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
  }

  async findAll() {
    return await this.clubRepo.find({
      where: {
        status: { id: 1 },
      },
    });
  }

  async findOne(id: number) {
    const club = await this.clubRepo.findOne({
      relations: [
        'covers',
        'contacts',
        'locations',
        'clubSocialNetworks',
        'clubSocialNetworks.socialNetwork',
      ],
      where: {
        id,
        status: { id: 1 },
      },
    });
    if (!club) {
      throw new NotFoundException(`Club with id ${id} not found`);
    }

    const cover = club.covers[0] || { url_image: null };
    const contact = club.contacts[0] || { phone: null };
    const location = club.locations[0] || { address: null, mapsUrl: null };

    return {
      id: club.id,
      name: club.name,
      description: club.description,
      phone: contact.phone,
      logoUrl: club.logoUrl,
      coverUrl: cover.url_image,
      address: location.address,
      mapsUrl: location.mapsUrl,
      socialReds: club.clubSocialNetworks.map((s) => {
        return {
          id: s.socialNetwork.id,
          name: s.socialNetwork.name,
          logoUrl: s.logo_url,
        };
      }),
    };
  }

  async findSchedule(id: number) {
    await this.findOne(id);
    const schedules = await this.clubScheduleRepo.find({
      relations: ['club', 'status'],
      where: {
        club: { id },
        status: { id: 1 },
      },
    });

    return schedules.map((schedule) => {
      return {
        id: schedule.id,
        dayOfWeek: schedule.dayOfWeek,
        openingTime: schedule.openingTime,
        closingTime: schedule.closingTime,
      };
    });
  }

  async findAllContact(idClub: number) {
    const items = this.clubContactRepo.find({
      where: {
        club: { id: idClub },
        status: { id: 1 },
      },
    });
    return items;
  }
  
}
