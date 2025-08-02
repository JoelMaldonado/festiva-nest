import { Injectable, NotFoundException } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '@entities/event.entity';
import { CreateEventDto } from '@dtos/create-event.dto';
import { EventCategoryService } from './event-category.service';
import { ClubService } from 'src/modules/club/services/club.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,

    private readonly eventCategoryService: EventCategoryService,
    private readonly clubService: ClubService,
  ) {}

  async findAll() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const items = await this.repo.find({
      relations: ['status', 'eventCategory', 'club'],
      where: {
        status: { id: 1 },
        eventDatetime: MoreThanOrEqual(yesterday),
      },
      order: {
        eventDatetime: 'ASC',
      },
    });
    return items;
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      relations: ['status', 'club', 'club.locations', 'eventCategory'],
      where: { id, status: { id: 1 } },
    });
    if (!item) {
      throw new NotFoundException('Event not found');
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      eventDatetime: item.eventDatetime,
      nameEventCategory: item.eventCategory?.title ?? null,
      location: item.club.locations[0]?.address ?? null,
    };
  }

  async create(dto: CreateEventDto) {
    const club = await this.clubService.findOne(dto.clubId);

    const eventCategory = await this.eventCategoryService.findOne(
      dto.eventCategoryId,
    );

    const item = this.repo.create({
      club: club,
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      eventDatetime: dto.eventDatetime,
      eventCategory: eventCategory,
      status: { id: 1 },
    });
    await this.repo.save(item);
  }

  async update(id: number, dto: CreateEventDto) {
    const item = await this.repo.findOne({
      relations: ['status'],
      where: { id, status: { id: 1 } },
    });
    if (!item) {
      throw new NotFoundException('Event not found');
    }

    const club = await this.clubService.findOne(dto.clubId);
    const eventCategory = await this.eventCategoryService.findOne(
      dto.eventCategoryId,
    );

    const preload = await this.repo.preload({
      id,
      club: club,
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      eventDatetime: dto.eventDatetime,
      eventCategory: eventCategory,
    });

    if (!preload) {
      throw new NotFoundException('Event not found');
    }

    await this.repo.save(preload);
  }

  async remove(id: number) {
    const item = await this.repo.findOne({
      relations: ['status'],
      where: { id, status: { id: 1 } },
    });
    if (!item) {
      throw new NotFoundException('Event not found');
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
      throw new NotFoundException('Event not found');
    }
    item.status.id = 1;
    await this.repo.save(item);
  }
}
