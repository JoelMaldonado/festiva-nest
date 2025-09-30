import { ClubDto } from '@dtos/club.dto';
import { ClubCover } from '@entities/club-cover.entity';
import { ClubDetail } from '@entities/club-detail.entity';
import { ClubLocation } from '@entities/club-location.entity';
import { ClubSchedule } from '@entities/club-schedule.entity';
import { ClubSocialNetwork } from '@entities/club-social-network.entity';
import { Club } from '@entities/club.entity';
import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubLocation)
    private readonly clubLocationRepo: Repository<ClubLocation>,
    @InjectRepository(ClubSchedule)
    private readonly clubScheduleRepo: Repository<ClubSchedule>,
    @InjectRepository(ClubCover)
    private readonly clubCoverRepo: Repository<ClubCover>,
    @InjectRepository(ClubSocialNetwork)
    private readonly clubSocialNetworkRepo: Repository<ClubSocialNetwork>,
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,

    @InjectRepository(ClubDetail)
    private readonly clubDetailRepo: Repository<ClubDetail>,

    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: ClubDto) {
    const itemCreate = this.clubRepo.create(dto);
    await this.clubRepo.save(itemCreate);
    return itemCreate;
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
    const list = await this.clubRepo.find({
      relations: [
        'covers',
        'emails',
        'phones',
        'locations',
        'clubSocialNetworks',
        'clubSocialNetworks.socialNetwork',
        'clubSchedules',
      ],
      where: {
        status: { id: 1 },
      },
    });

    return list;
  }

  async findAllQuery(limit?: number) {
    const qb = this.clubRepo.createQueryBuilder('club');
    qb.leftJoinAndSelect('club.covers', 'covers');
    qb.leftJoinAndSelect('club.locations', 'locations');

    if (limit) {
      qb.take(limit);
    }
    qb.orderBy('RAND()');

    const [items, total] = await qb.getManyAndCount();

    return {
      items: items,
      meta: {
        page: 1,
        limit: limit || 1000,
        total,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  async findAllQuery2(page: number, limit: number) {
    const qb = this.clubRepo.createQueryBuilder('club');
    qb.leftJoinAndSelect('club.covers', 'covers');
    qb.leftJoinAndSelect('club.locations', 'locations');

    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items: items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: total > page * limit,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findAllQuery3(random: boolean, limit?: number) {
    const qb = this.clubRepo.createQueryBuilder('club');
    qb.leftJoinAndSelect('club.covers', 'covers');
    qb.leftJoinAndSelect('club.locations', 'locations');
    qb.leftJoinAndSelect('club.clubSchedules', 'clubSchedules');

    if (random) {
      qb.orderBy('RAND()');
    }

    if (limit) qb.take(limit);

    return await qb.getMany();
  }

  async findOne(id: number) {
    const club = await this.clubRepo.findOne({
      relations: [
        'covers',
        'emails',
        'phones',
        'locations',
        'clubSocialNetworks',
        'clubSocialNetworks.socialNetwork',
        'clubSchedules',
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
        url: item.url,
      };
    });
  }

  async findClubDetail(idClub: number): Promise<any> {
    const item = await this.clubDetailRepo.findOne({
      where: { club: { id: idClub } },
    });

    if (!item) {
      return null;
    }

    if (item.lastFetched) {
      const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000); // ahora - 4h
      if (item.lastFetched > fourHoursAgo) {
        // 👌 Aún no han pasado 4 horas → devolver lo guardado
        return item;
      }
    }

    try {
      const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
      const url = `https://maps.googleapis.com/maps/api/place/details/json`;
      const { data } = await this.httpService.axiosRef.get(url, {
        params: {
          place_id: item.googlePlaceId,
          fields: 'rating,user_ratings_total',
          key: apiKey,
        },
      });

      if (data.result) {
        item.googleRating = data.result.rating ?? null;
        item.googleUserRatingsTotal = data.result.user_ratings_total ?? null;
        item.lastFetched = new Date();

        await this.clubDetailRepo.save(item);
      }
    } catch (error) {
      console.error(
        `Error obteniendo rating para clubId=${item.clubId}:`,
        error.message,
      );
    }

    return item;
  }

  async getClubRating() {
    const list = await this.clubDetailRepo
      .createQueryBuilder('club')
      .where('club.googlePlaceId IS NOT NULL')
      .andWhere("club.googlePlaceId <> ''")
      .getMany();

    const apiKey = this.configService.get<string>('GOOGLE_API_KEY');

    for (const detail of list) {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json`;
        const { data } = await this.httpService.axiosRef.get(url, {
          params: {
            place_id: detail.googlePlaceId,
            fields: 'rating,user_ratings_total',
            key: apiKey,
          },
        });

        if (data.result) {
          detail.googleRating = data.result.rating ?? null;
          detail.googleUserRatingsTotal =
            data.result.user_ratings_total ?? null;
          detail.lastFetched = new Date();

          await this.clubDetailRepo.save(detail);
        }
      } catch (error) {
        console.error(
          `Error obteniendo rating para clubId=${detail.clubId}:`,
          error.message,
        );
      }
    }

    return { message: 'ok' };
  }

  async findAllHome(limit: number) {
    const qb = this.clubRepo
      .createQueryBuilder('club')
      .leftJoinAndSelect('club.status', 'status')
      .leftJoinAndSelect('club.covers', 'covers')
      .leftJoinAndSelect('club.emails', 'emails')
      .leftJoinAndSelect('club.phones', 'phones')
      .leftJoinAndSelect('club.locations', 'locations')
      .leftJoinAndSelect('club.clubSocialNetworks', 'clubSocialNetworks')
      .leftJoinAndSelect('clubSocialNetworks.socialNetwork', 'socialNetwork')
      .leftJoinAndSelect('club.clubSchedules', 'clubSchedules')
      .where('status.id = :statusId', { statusId: 1 })
      .orderBy('RAND()')
      .take(limit);

    return await qb.getMany();
  }

  async prueba(idClub: number, dayOfWeek: number, time: string) {
    const club = await this.clubRepo.findOne({
      relations: ['clubSchedules'],
      where: {
        id: idClub,
        status: { id: 1 },
        clubSchedules: { dayOfWeek: dayOfWeek },
      },
    });

    if (!club) {
      throw new NotFoundException(`Club with id ${idClub} not found`);
    }

    var isOpen = false;

    club.clubSchedules.forEach((schedule) => {
      const openingTime = schedule.openingTime;
      const closingTime = schedule.closingTime;

      const timeDate = new Date(`1970-01-01T${time}Z`);
      const openingDate = new Date(`1970-01-01T${openingTime}Z`);
      const closingDate = new Date(`1970-01-01T${closingTime}Z`);

      if (openingDate <= closingDate) {
        if (timeDate >= openingDate && timeDate <= closingDate) {
          isOpen = true;
        }
      } else {
        if (timeDate >= openingDate || timeDate <= closingDate) {
          isOpen = true;
        }
      }
    });

    return {
      name: club.name,
      schedules: club.clubSchedules,
      isOpen: isOpen,
    };
  }

  findAllTest() {
    return this.clubRepo.find();
  }
}
