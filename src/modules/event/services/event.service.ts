import { Injectable, NotFoundException } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity, EventScheduleEntity } from '@entities/event.entity';
import { CreateEventDto } from '@dtos/create-event.dto';
import { EventCategoryService } from './event-category.service';
import { ClubService } from 'src/modules/club/services/club.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,

    @InjectRepository(EventScheduleEntity)
    private readonly eventScheduleRepo: Repository<EventScheduleEntity>,

    private readonly eventCategoryService: EventCategoryService,
    private readonly clubService: ClubService,
  ) {}

  async findAll(clubId?: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // para comparar solo fecha

    const qb = this.repo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.status', 'status')
      .leftJoinAndSelect('event.eventCategory', 'eventCategory')
      .leftJoinAndSelect('event.club', 'club')
      .leftJoinAndSelect('event.schedule', 'eventSchedule')
      .where('status.id = :statusId', { statusId: 1 })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('event_schedule', 'es')
          .where('es.event_id = event.id')
          .andWhere('es.event_date >= :today')
          .getQuery();
        return `EXISTS ${subQuery}`;
      })
      .setParameter('today', today);

    if (clubId) {
      qb.andWhere('club.id = :clubId', { clubId });
    }

    qb.orderBy(
      `(SELECT MIN(es2.event_date) 
      FROM event_schedule es2 
      WHERE es2.event_id = event.id 
        AND es2.event_date >= :today)`,
      'ASC',
    );

    return qb.getMany();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      relations: [
        'status',
        'club',
        'club.locations',
        'eventCategory',
        'schedule',
      ],
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
      eventDate: item.schedule[0]?.eventDate ?? null,
      startTime: item.schedule[0]?.startTime ?? null,
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
    });
    await this.repo.save(item);

    const schedule = this.eventScheduleRepo.create({
      event: item,
      eventDate: dto.eventDate,
      startTime: dto.startTime,
    });
    await this.eventScheduleRepo.save(schedule);

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
