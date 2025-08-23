import { Injectable } from '@nestjs/common';
import { ClubService } from '../club/services/club.service';
import { ClubScheduleService } from '../club/services/club-schedule.service';
import { estaDentroDelHorario } from 'src/utils/functions';

@Injectable()
export class UiService {
  constructor(
    private readonly clubService: ClubService,
    private readonly clubScheduleService: ClubScheduleService,
  ) {}

  async findAllUiClub(page: number, limit: number) {
    const res = await this.clubService.findAllQuery(page, limit);
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

    return clubDetail;

    return {
      id: club.id,
      name: club.name,
      description: club.description,
      logoUrl: club.logoUrl,
      address: club.locations.length > 0 ? club.locations[0].address : null,
      covers: club.covers.map((cover) => cover.urlImage),
      googleRating: clubDetail?.googleRating || null,
      googleUserRatingsTotal: clubDetail?.googleUserRatingsTotal || null,
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
