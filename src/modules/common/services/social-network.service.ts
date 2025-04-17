import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialNetwork } from 'src/common/entities/social-network.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectRepository(SocialNetwork)
    private readonly repo: Repository<SocialNetwork>,
  ) {}

  async findAll(statusId: number) {
    const qb = this.repo.createQueryBuilder('social_network');
    qb.leftJoinAndSelect('social_network.status', 'status');
    if (statusId != 0) {
      qb.where('status.id = :statusId', { statusId });
    }
    const items = await qb.getMany();
    const mapItems = items.map((item) => {
      return {
        id: item.id,
        title: item.name,
        idStatus: item.status.id,
      };
    });
    return mapItems;
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    return item;
  }

  async create(name: string, logoUrl: string) {
    const existingItem = await this.repo.findOne({
      where: { name },
    });
    if (existingItem) {
      throw new Error('Item already exists');
    }

    const item = this.repo.create({
      name: name,
      logoUrl: logoUrl,
      status: { id: 1 },
    });
    await this.repo.save(item);
  }
  async update(id: number, name: string, logoUrl: string) {
    const item = await this.repo.findOne({
      relations: ['status'],
      where: { id, status: { id: 1 } },
    });
    if (!item) {
      throw new Error('Item not found');
    }

    const duplicatedItem = await this.repo.findOne({
      where: { name: name, id: Not(id) },
    });

    if (duplicatedItem) {
      throw new Error('Item already exists');
    }

    item.name = name;

    if (logoUrl) {
      item.logoUrl = logoUrl;
    }
    await this.repo.save(item);
  }
  async delete(id: number) {
    const item = await this.repo.findOne({
      relations: ['status'],
      where: { id, status: { id: 1 } },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    item.status.id = 2;
    await this.repo.save(item);
  }
  async restore(id: number) {
    const item = await this.repo.findOne({
      relations: ['status'],
      where: { id, status: { id: 2 } },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    item.status.id = 1;
    await this.repo.save(item);
  }
}
