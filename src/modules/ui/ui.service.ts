import { Injectable } from '@nestjs/common';
import { ClubService } from '../club/services/club.service';

@Injectable()
export class UiService {
  constructor(private readonly clubService: ClubService) {}

  async findAllUiClub(page: number, limit: number) {
    const res = await this.clubService.findAllQuery(page, limit);
    const map = res.items.map((club) => {
      return {
        id: club.id,
        name: club.name,
        logoUrl: club.logoUrl,
        coverUrl: club.covers.length > 0 ? club.covers[0].urlImage : null,
        type: 'club',
      };
    });
    return {
      items: map,
      meta: res.meta,
    };
  }

  async findOneUiDetail(id: number) {
    const club = await this.clubService.findOne(id);
    return {
      id: club.id,
      name: club.name,
      description: club.description,
      logoUrl: club.logoUrl,
      covers: club.covers.map((cover) => cover.urlImage),
      socialNetworks: club.clubSocialNetworks.map((item) => {
        return {
          url: item.url,
          name: item.socialNetwork.name,
          logoUrl: item.socialNetwork.logoUrl,
        };
      }),
    };
  }
}
