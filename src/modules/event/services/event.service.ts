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

  async findAll(clubId?: string) {

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const qb = this.repo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.status', 'status')
      .leftJoinAndSelect('event.eventCategory', 'eventCategory')
      .leftJoinAndSelect('event.club', 'club')
      .where('status.id = :statusId', { statusId: 1 })
      .andWhere('event.eventDate >= :yesterday', { yesterday });

    if (clubId) {
      qb.andWhere('club.id = :clubId', { clubId });
    }

    qb.orderBy('event.eventDate', 'ASC');

    return qb.getMany();
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
      eventDatetime: item.eventDate, // TODO Eliminar
      eventDate: item.eventDate,
      startTime: item.startTime,
      nameEventCategory: item.eventCategory?.title ?? null,
      location: item.club.locations[0]?.address ?? null,
      clubId: item.club.id,
      clubName: item.club.name,
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
      eventCategory: eventCategory,
      status: { id: 1 },
      eventDate: dto.eventDate,
      startTime: dto.startTime,
    });
    await this.repo.save(item);

    return item.id;
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
