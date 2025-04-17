import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistType } from '../../../common/entities/artist-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistTypeService {
  constructor(
    @InjectRepository(ArtistType)
    private readonly repo: Repository<ArtistType>,
  ) {}

  async findAll(statusId: number = 1) {
    const list = await this.repo.find({
      relations: ['status'],
      where: { status: { id: statusId } },
    });
    const listMap = list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        statusId: item.status.id,
      };
    });
    return listMap;
  }
}
