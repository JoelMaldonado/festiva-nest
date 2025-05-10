import { ArtistSocialNetworkEntity } from '@entities/artist-social-network.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialNetworkService } from 'src/modules/common/services/social-network.service';
import { Repository } from 'typeorm';
import { ArtistService } from './artist.service';

@Injectable()
export class ArtistSocialNetworkService {
  constructor(
    @InjectRepository(ArtistSocialNetworkEntity)
    private readonly repository: Repository<ArtistSocialNetworkEntity>,

    private readonly artistService: ArtistService,
    private readonly sociaNetworkService: SocialNetworkService,
  ) {}

  async findAll(idArtist: number) {
    const items = await this.repository.find({
      relations: ['socialNetwork'],
      where: {
        artist: { id: idArtist },
        status: { id: 1 },
      },
    });

    return items;
  }

  async create(idArtist: number, url: string, socialNetworkId: number) {
    const socialNetwork =
      await this.sociaNetworkService.findOne(socialNetworkId);

    const artist = await this.artistService.findOne(idArtist);

    const item = this.repository.create({
      artist: artist,
      url: url,
      socialNetwork: socialNetwork,
      status: {
        id: 1,
      },
    });

    await this.repository.save(item);
    return item.id;
  }

  async delete(id: number) {
    const item = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    await this.repository.remove(item);
  }
}
