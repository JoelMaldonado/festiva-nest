import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistType } from '../../../common/entities/artist-type.entity';
import { Not, Repository } from 'typeorm';
import { CreateArtistTypeDto } from 'src/common/dto/create-artist-type.dto';
import { log } from 'console';

@Injectable()
export class ArtistTypeService {
  constructor(
    @InjectRepository(ArtistType)
    private readonly repo: Repository<ArtistType>,
  ) {}

  async findAll(statusId: number = 1) {
    const qb = this.repo.createQueryBuilder('artistType');
    qb.leftJoinAndSelect('artistType.status', 'status');
    if (statusId !== 0) {
      qb.where('status.id = :statusId', { statusId });
    }

    const list = await qb.getMany();

    const listMap = list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        statusId: item.status.id,
      };
    });
    return listMap;
  }

  async create(dto: CreateArtistTypeDto) {
    const isExist = await this.repo.findOne({
      relations: ['status'],
      where: {
        name: dto.name,
        status: { id: 1 },
      },
    });
    if (isExist) {
      throw new NotFoundException('Item already exists');
    }
    const item = this.repo.create({
      name: dto.name,
      status: { id: 1 },
    });
    await this.repo.save(item);
  }

  async update(id: number, dto: CreateArtistTypeDto) {
    const item = await this.repo.findOne({
      where: { id, status: { id: 1 } },
      relations: ['status'],
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    const duplicate = await this.repo.findOne({
      where: {
        name: dto.name,
        status: { id: 1 },
        id: Not(id),
      },
      relations: ['status'],
    });

    if (duplicate) {
      throw new ConflictException(
        'Ya existe un tipo de artista con ese nombre',
      );
    }

    item.name = dto.name;
    await this.repo.save(item);
  }

  async delete(id: number) {
    const item = await this.repo.findOne({
      where: { id, status: { id: 1 } },
      relations: ['status'],
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    item.status.id = 2;
    await this.repo.save(item);
  }
  async restore(id: number) {
    const item = await this.repo.findOne({
      where: { id, status: { id: 2 } },
      relations: ['status'],
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    item.status.id = 1;
    await this.repo.save(item);
    return;
  }
}
