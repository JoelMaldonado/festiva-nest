import { ClubCover } from '@entities/club-cover.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClubCoverService {
  constructor(
    @InjectRepository(ClubCover)
    private readonly repo: Repository<ClubCover>,
  ) {}

  async findAll(idClub: number) {
    const items = await this.repo.find({
      relations: {
        club: true,
      },
      where: {
        club: {
          id: idClub,
        },
      },
    });
    const itemsMap = items.map((item) => {
      return {
        id: item.id,
        imageUrl: item.url_image,
      };
    });
    return itemsMap;
  }

  async create(idClub: number, imageUrl: string) {
    const item = this.repo.create({
      url_image: imageUrl,
      club: {
        id: idClub,
      },
    });
    await this.repo.save(item);
    return item.id;
  }

  async delete(id: number) {
    const item = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      throw new Error('Club cover not found');
    }
    await this.repo.delete(id);
  }
}
