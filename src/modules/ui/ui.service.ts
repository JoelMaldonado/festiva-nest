import { Injectable } from '@nestjs/common';
import { ClubService } from '../club/services/club.service';
import { ClubScheduleService } from '../club/services/club-schedule.service';
import { estaDentroDelHorario } from 'src/utils/functions';
import { InjectRepository } from '@nestjs/typeorm';
import { AppScreenEntity } from '@entities/app-screens.entity';
import { Repository } from 'typeorm';
import { mapperClub } from 'src/common/mappers/club.mapper';
import { EventService } from '../event/services/event.service';
import { ArtistService } from '../artist/services/artist.service';

@Injectable()
export class UiService {
  constructor(
    private readonly clubService: ClubService,
    private readonly clubScheduleService: ClubScheduleService,
    private readonly eventService: EventService,
    private readonly artistService: ArtistService,
    @InjectRepository(AppScreenEntity)
    private readonly appScreenRepository: Repository<AppScreenEntity>,
  ) {}

  async findAllUiScreens() {
    return this.appScreenRepository.find();
  }

  async findAllUiClub(limit?: number) {
    const res = await this.clubService.findAllQuery(limit);
    const today = new Date();

    const items = await Promise.all(
      res.items.map(async (club) => {
        const schedule = await this.clubScheduleService.findOneByDay(
          club.id,
          today.getDay(),
        );

        let isOpen: boolean | null = null;

        if (schedule) {
          isOpen = estaDentroDelHorario(
            schedule.openingTime,
            schedule.closingTime,
            today,
          );
        }

        return {
          id: club.id,
          name: club.name,
          logoUrl: club.logoUrl,
          coverUrl: club.covers.length > 0 ? club.covers[0].urlImage : null,
          address: club.locations.length > 0 ? club.locations[0].address : null,
          isOpen: isOpen,
        };
      }),
    );

    return {
      items,
      meta: res.meta,
    };
  }

  async findAllUiClubV2(random: boolean, limit?: number) {
    const res = await this.clubService.findAllQuery3(random, limit);

    const itemsMapped = res.map((club) => {
      return {
        id: club.id,
        name: club.name,
        logoUrl: club.logoUrl,
        coverUrl: club.covers.length > 0 ? club.covers[0].urlImage : null,
        address: club.locations.length > 0 ? club.locations[0].address : null,
        schedule: club.clubSchedules.map((schedule) => {
          return {
            dayOfWeek: schedule.dayOfWeek,
            openingTime: schedule.openingTime,
            closingTime: schedule.closingTime,
          };
        }),
      };
    });

    return itemsMapped;
  }

  async findOneUiDetail(id: number) {
    const club = await this.clubService.findOne(id);
    const clubDetail = await this.clubService.findClubDetail(id);

    return {
      id: club.id,
      name: club.name,
      description: club.description,
      logoUrl: club.logoUrl,
      address: club.locations.length > 0 ? club.locations[0].address : null,
      covers: club.covers.map((cover) => cover.urlImage),
      googleRating: Number(clubDetail?.googleRating) || null,
      googleUserRatingsTotal:
        Number(clubDetail?.googleUserRatingsTotal) || null,
      socialNetworks: club.clubSocialNetworks.map((item) => {
        return {
          url: item.url,
          code: item.socialNetwork.code,
          name: item.socialNetwork.name,
        };
      }),
    };
  }

  async findAllUiHome() {
    const clubs = await this.findAllUiClub(10);
    const events = await this.eventService.findAll(undefined, 10);
    const artists = await this.artistService.findAll();
    return {
      clubs: clubs.items,
      events,
      artists,
    };
  }

  async findAllUiHomeV2() {
    const clubs = await this.findAllUiClubV2(true, 10);
    const events = await this.eventService.findAll(undefined, 10);
    const artists = await this.artistService.findAll();
    return {
      clubs,
      events,
      artists,
    };
  }
}
