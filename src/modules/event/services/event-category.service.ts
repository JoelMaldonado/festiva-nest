import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from 'src/common/entities/event-category.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly repo: Repository<EventCategory>,
  ) {}

  async findAll(statusId: number) {
    const qb = this.repo.createQueryBuilder('event_category');
    qb.leftJoinAndSelect('event_category.status', 'status');
    if (statusId != 0) {
      qb.where('status.id = :statusId', { statusId });
    }
    const items = await qb.getMany();
    const mapItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        idStatus: item.status.id,
      };
    });
    return mapItems;
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    return item;
  }

  async create(title: string) {
    const existingItem = await this.repo.findOne({
      where: { title },
    });
    if (existingItem) {
      throw new Error('Item already exists');
    }

    const item = this.repo.create({
      title: title,
      status: { id: 1 },
    });
    await this.repo.save(item);
  }
  async update(id: number, title: string) {
    const item = await this.repo.findOne({
      relations: ['status'],
      where: { id },
    });
    if (!item) {
      throw new Error('Item not found');
    }

    const duplicatedItem = await this.repo.findOne({
      where: { title: title, id: Not(id) },
    });

    if (duplicatedItem) {
      throw new Error('Item already exists');
    }

    await this.repo.update(id, { title: title });
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
