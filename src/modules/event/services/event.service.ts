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
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    const list = await this.eventScheduleRepo.find({
      relations: ['event', 'event.club', 'event.eventCategory'],
      where: {
        eventDate: MoreThanOrEqual(yesterday),
        statusId: 1,
        event: clubId ? { club: { id: +clubId } } : undefined,
      },
      order: { eventDate: 'ASC', startTime: 'ASC' },
    });
    const listMap = list.map((item) => {
      return {
        id: item.id,
        eventId: item.event?.id,
        title: item.event?.title,
        description: item.event?.description,
        imageUrl: item.event?.imageUrl,
        idClub: item.event?.club?.id || null,
        nameClub: item.event?.club?.name || null,
        idEventCategory: item.event?.eventCategory?.id || null,
        nameEventCategory: item.event?.eventCategory?.title || null,
        idStatus: item.statusId || null,
        eventDate: item?.eventDate || null,
        startTime: item?.startTime || null,
      };
    });
    return listMap;
  }

  async getEventWeekdays(): Promise<string[]> {
    const rows = await this.eventScheduleRepo
      .createQueryBuilder('event_schedule')
      .select('DATE(event_schedule.eventDate)', 'date')
      .where('event_schedule.statusId = :statusId', { statusId: 1 })
      .andWhere('event_schedule.eventDate >= CURDATE()') // solo desde hoy
      .groupBy('DATE(event_schedule.eventDate)')
      .orderBy('DATE(event_schedule.eventDate)', 'ASC')
      .getRawMany<{ date: string }>();

    // devuelve únicamente la lista de fechas como strings
    return rows.map((r) => r.date);
  }

  async findAllFiltered(day: string) {
    const queryBuilder = this.eventScheduleRepo
      .createQueryBuilder('event_schedule')
      .leftJoinAndSelect('event_schedule.event', 'event')
      .leftJoinAndSelect('event.club', 'club')
      .leftJoinAndSelect('event.eventCategory', 'eventCategory')
      .where('event_schedule.statusId = :statusId', { statusId: 1 })
      .andWhere('event_schedule.eventDate = :eventDate', { eventDate: day });

    const list = await queryBuilder.getMany();

    const listMap = list.map((item) => {
      return {
        id: item.id,
        eventId: item.event?.id,
        title: item.event?.title,
        description: item.event?.description,
        imageUrl: item.event?.imageUrl,
        idClub: item.event?.club?.id || null,
        nameClub: item.event?.club?.name || null,
        idEventCategory: item.event?.eventCategory?.id || null,
        nameEventCategory: item.event?.eventCategory?.title || null,
        idStatus: item.statusId || null,
        eventDate: item?.eventDate || null,
        startTime: item?.startTime || null,
      };
    });
    return listMap;
  }

  async findAllPaged(page: number, limit: number) {
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);

    const [list, total] = await this.eventScheduleRepo.findAndCount({
      relations: ['event', 'event.club', 'event.eventCategory'],
      where: {
        eventDate: MoreThanOrEqual(yesterday),
        statusId: 1,
      },
      order: { eventDate: 'ASC', startTime: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const listMap = list.map((item) => {
      return {
        id: item.event?.id,
        title: item.event?.title,
        description: item.event?.description,
        imageUrl: item.event?.imageUrl,
        idClub: item.event?.club?.id || null,
        nameClub: item.event?.club?.name || null,
        idEventCategory: item.event?.eventCategory?.id || null,
        nameEventCategory: item.event?.eventCategory?.title || null,
        idStatus: item.statusId || null,
        eventDate: item?.eventDate || null,
        startTime: item?.startTime || null,
      };
    });

    return {
      items: listMap,
      total,
      page,
      limit,
    };
  }

  async findOneById(id: number) {
    const item = await this.repo.findOne({
      relations: ['club', 'club.locations', 'eventCategory'],
      where: {
        id: id,
      },
    });

    if (!item) {
      throw new NotFoundException('Event not found');
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      eventDate: null,
      startTime: null,
      nameEventCategory: item.eventCategory?.title ?? null,
      location: item.club.locations[0]?.address ?? null,
      clubId: item.club.id,
      clubName: item.club.name,
    };
  }

  async findEventScheduleById(id: number) {
    const item = await this.eventScheduleRepo.findOne({
      relations: [
        'event',
        'event.eventCategory',
        'event.club',
        'event.club.locations',
      ],
      where: {
        id: id,
      },
    });

    if (!item) {
      throw new NotFoundException('Event Schedule not found');
    }

    return {
      id: item.id,
      title: item.event.title,
      description: item.event.description,
      imageUrl: item.event.imageUrl,
      eventDate: item.eventDate ?? null,
      startTime: item.startTime ?? null,
      nameEventCategory: item.event?.eventCategory?.title ?? null,
      location: item.event.club.locations[0]?.address ?? null,
      clubId: item.event.club.id,
      clubName: item.event.club.name,
    };
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
