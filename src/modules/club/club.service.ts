import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from '../../common/entities/club.entity';
import { Repository } from 'typeorm';
import { ClubContact } from '../../common/entities/club-contact.entity';
import { ClubCover } from '../../common/entities/club-cover.entity';
import { ClubLocation } from '../../common/entities/club-location.entity';
import { ClubSocialNetwork } from '../../common/entities/club-social-network.entity';
import { ClubDto } from '../../common/dto/club.dto';
import { ClubSchedule } from '../../common/entities/club-schedule.entity';
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
    @InjectRepository(ClubCover)
    private readonly clubCoverRepo: Repository<ClubCover>,
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
    return club;
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

  async findAllCovers(idClub: number) {
    const items = this.clubCoverRepo.find({
      where: {
        club: { id: idClub },
        status: { id: 1 },
      },
    });
    return items;
  }

  async findAllSocialNetworks(idClub: number) {
    const items = await this.clubSocialNetworkRepo.find({
      relations: ['socialNetwork'],
      where: {
        club: { id: idClub },
        status: { id: 1 },
      },
    });

    return items.map((item) => {
      return {
        id: item.socialNetwork.id,
        name: item.socialNetwork.name,
        logoUrl: item.logo_url,
      };
    });
  }

}
