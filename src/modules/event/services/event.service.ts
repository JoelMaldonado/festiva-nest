import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '@entities/event.entity';
import { CreateEventDto } from '@dtos/create-event.dto';
import { ClubService } from 'src/modules/club/club.service';
import { EventCategoryService } from './event-category.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,

    private readonly eventCategoryService: EventCategoryService,
    private readonly clubService: ClubService,
  ) {}

  async findAll() {
    const items = await this.repo.find({
      relations: ['status', 'eventCategory', 'club'],
      where: { status: { id: 1 } },
    });
    return items;
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      relations: {
        status: true,
      },
      where: { id, status: { id: 1 } },
    });
    if (!item) {
      throw new NotFoundException('Event not found');
    }
    return item;
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
