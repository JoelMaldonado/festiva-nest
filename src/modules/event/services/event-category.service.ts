import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@entities/category.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ) {}

  async findAll(statusId: number) {
    const qb = this.repo.createQueryBuilder('event_category');
    qb.leftJoinAndSelect('event_category.status', 'status');
    if (statusId != 0) {
      qb.where('status.id = :statusId', { statusId });
    }
    return await qb.getMany();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      relations: { status: true },
      where: {
        id,
        status: { id: 1 },
      },
    });
    if (!item) {
      throw new NotFoundException(`Event category with ${id} not found`);
    }
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
