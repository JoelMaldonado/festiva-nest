import { ClubSocialNetwork } from '@entities/club-social-network.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubService } from './club.service';
import { SocialNetworkService } from 'src/modules/common/services/social-network.service';
import { ClubSocialNetworkDto } from '@dtos/club.dto';

@Injectable()
export class ClubSocialNetworkService {
  constructor(
    @InjectRepository(ClubSocialNetwork)
    private readonly repo: Repository<ClubSocialNetwork>,
    private readonly clubService: ClubService,
    private readonly socialNetworkService: SocialNetworkService,
  ) {}

  async findAll(idClub: number) {
    const club = await this.clubService.findOne(idClub);
    const items = await this.repo.find({
      relations: ['socialNetwork'],
      where: {
        club: club,
        status: { id: 1 },
      },
    });
    return items;
  }

  async create(dto: ClubSocialNetworkDto) {
    const club = await this.clubService.findOne(dto.idClub);

    const socialNetwork = await this.socialNetworkService.findOne(
      dto.idSocialNetwork,
    );

    const itemCreate = this.repo.create({
      club: club,
      socialNetwork: socialNetwork,
      url: dto.url,
      status: { id: 1 },
    });

    await this.repo.save(itemCreate);
    return itemCreate.id;
  }

  async delete(id: number) {
    const item = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!item) {
      throw new Error('Club Social Network not found');
    }

    await this.repo.remove(item);
  }
}
