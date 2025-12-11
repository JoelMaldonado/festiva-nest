import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@entities/category.entity';
import { DataSource, Not, Repository } from 'typeorm';
import { EventCategoryEntity } from '@entities/event-category.entity';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,

    @InjectRepository(EventCategoryEntity)
    private readonly eventCategoryRepo: Repository<EventCategoryEntity>,
  ) {}

  async findAll(statusId: number) {
    const qb = this.repo.createQueryBuilder('event_category');
    qb.leftJoinAndSelect('event_category.status', 'status');
    if (statusId != 0) {
      qb.where('status.id = :statusId', { statusId });
    }
    // ordernar por sortOrder
    qb.orderBy('event_category.sortOrder', 'ASC');
    return await qb.getMany();
  }

  async findRandomCategoryByEventId(eventId: number) {
    const item = await this.eventCategoryRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.category', 'category')
      .where('c.eventId = :eventId', { eventId })
      .orderBy('RAND()')
      .limit(1)
      .getOne();
    return item;
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

  async findCategoriesByEventId(
    eventId: number,
  ): Promise<EventCategoryEntity[]> {
    return await this.eventCategoryRepo.find({
      where: {
        event: { id: eventId },
      },
    });
  }

  async saveEventCategoriesById(
    eventId: number,
    listEventCategories: number[],
  ): Promise<void> {
    // 1) Normaliza: números únicos
    const ids = Array.from(
      new Set((listEventCategories ?? []).map(Number).filter(Number.isFinite)),
    );

    await this.eventCategoryRepo.manager.transaction(async (em) => {
      // Repos dentro de la tx
      const repo = em.getRepository(EventCategoryEntity);

      // 2) Borra todo lo existente del evento
      await repo.delete({ eventId });

      // 3) Inserta los nuevos (si hay)
      if (ids.length > 0) {
        const rows = ids.map((categoryId) => ({ eventId, categoryId }));
        // Usa insert masivo; la PK compuesta evita duplicados
        await repo
          .createQueryBuilder()
          .insert()
          .into(EventCategoryEntity)
          .values(rows)
          .orIgnore() // defensivo si se colara un duplicado en 'ids'
          .execute();
      }
    });
  }
}
