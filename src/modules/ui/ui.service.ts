import { Injectable } from '@nestjs/common';
import { ClubService } from '../club/services/club.service';
import { ClubScheduleService } from '../club/services/club-schedule.service';
import { estaDentroDelHorario } from 'src/utils/functions';
import { InjectRepository } from '@nestjs/typeorm';
import { AppScreenEntity } from '@entities/app-screens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UiService {
  constructor(
    private readonly clubService: ClubService,
    private readonly clubScheduleService: ClubScheduleService,
    @InjectRepository(AppScreenEntity)
    private readonly appScreenRepository: Repository<AppScreenEntity>,
  ) {}

  async findAllUiScreens() {
    return this.appScreenRepository.find();
  }

  async findAllUiClub() {
    const res = await this.clubService.findAllQuery();
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
}
