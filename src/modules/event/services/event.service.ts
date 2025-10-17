import { Injectable, NotFoundException } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity, EventScheduleEntity } from '@entities/event.entity';
import { CreateEventDto } from '@dtos/create-event.dto';
import { EventCategoryService } from './event-category.service';
import { ClubService } from 'src/modules/club/services/club.service';
import { getRandomItem } from 'src/utils/functions';

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

  async findAll(clubId?: string, limit?: number) {
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
      take: limit,
    });
    const listMap = list.map((item) => {
      const categories = item.event.eventCategories ?? [];
      const randomCategory =
        categories.length > 0
          ? categories[Math.floor(Math.random() * categories.length)].category
          : null;
      return {
        id: item.id,
        eventId: item.event?.id,
        title: item.event?.title,
        description: item.event?.description,
        imageUrl: item.event?.imageUrl,
        idClub: item.event?.club?.id || null,
        nameClub: item.event?.club?.name || null,
        idEventCategory: randomCategory?.id || null,
        nameEventCategory: randomCategory?.title || null,
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

  async findAllPaged(
    page: number,
    limit: number,
    categoryId?: string,
    date?: string,
    search?: string,
  ) {
    // sanea page/limit
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    const offset = (safePage - 1) * safeLimit;

    // fecha mínima por defecto: hoy 00:00
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const qb = this.eventScheduleRepo
      .createQueryBuilder('es')
      .leftJoinAndSelect('es.event', 'e')
      .leftJoinAndSelect('e.club', 'c')

      .leftJoinAndSelect('e.eventCategories', 'ec') // EventCategoryEntity[]
      .leftJoinAndSelect('ec.category', 'cat') // CategoryEntity

      .where('es.statusId = :statusId', { statusId: 1 });

    // fecha: si se pasó `date`, usamos rango del día; si no, >= hoy
    if (date) {
      qb.andWhere('es.eventDate = :date', { date });
    } else {
      const yesterday = new Date();
      //yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      const todayStr = yesterday.toISOString().split('T')[0];
      qb.andWhere('es.eventDate >= :today', { today: todayStr });
    }

    // filtro por categoría (si llega)
    if (categoryId) {
      qb.andWhere('cat.id = :categoryId', { categoryId });
      // si ec.id es numérico, castea: { categoryId: Number(categoryId) }
    }

    if (search) {
      qb.andWhere('LOWER(e.title) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }

    // orden y paginación
    qb.orderBy('es.eventDate', 'ASC')
      .addOrderBy('es.startTime', 'ASC')
      .skip(offset)
      .take(safeLimit);

    const [list, total] = await qb.getManyAndCount();

    const items = list.map((item) => {
      const categories = item.event?.eventCategories ?? [];
      const randomCategory =
        categories.length > 0
          ? categories[Math.floor(Math.random() * categories.length)].category
          : null;

      return {
        id: item?.id,
        eventId: item.event?.id,
        title: item.event?.title,
        description: item.event?.description,
        imageUrl: item.event?.imageUrl,
        idClub: item.event?.club?.id ?? null,
        nameClub: item.event?.club?.name ?? null,
        idEventCategory: randomCategory?.id ?? null, // Cambiar a idCategory
        nameEventCategory: randomCategory?.title ?? null, // Cambiar a nameCategory
        idStatus: item.statusId ?? null,
        eventDate: item.eventDate ?? null,
        startTime: item.startTime ?? null,
      };
    });

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
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
      clubLogoUrl: item.club.logoUrl,
    };
  }

  async findEventScheduleById(id: number) {
    const item = await this.eventScheduleRepo.findOne({
      relations: [
        'event',
        'event.eventCategory',
        'event.club',
        'event.club.locations',
        'event.eventCategories',
        'event.eventCategories.category',
      ],
      where: {
        id: id,
      },
    });

    if (!item) {
      throw new NotFoundException('Event Schedule not found');
    }

    const randomCategory = getRandomItem(item.event.eventCategories);

    return {
      id: item.id,
      eventId: item.event.id,
      title: item.event.title,
      description: item.event.description,
      imageUrl: item.event.imageUrl,
      eventDate: item.eventDate ?? null,
      startTime: item.startTime ?? null,
      nameEventCategory: randomCategory?.category.title ?? null, // TODO Delete
      location: item.event.club.locations[0]?.address ?? null,
      clubId: item.event.club.id,
      clubName: item.event.club.name,
      ticketUrl: item.event.ticketUrl,
      categories: item.event.eventCategories.map((ec) => {
        return {
          id: ec.category.id,
          title: ec.category.title,
        };
      }),
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
      ticketUrl: dto.ticketUrl,
      status: { id: 1 },
    });
    await this.repo.save(item);

    const schedule = this.eventScheduleRepo.create({
      event: item,
      eventDate: dto.eventDate,
      startTime: dto.startTime,
    });
    await this.eventScheduleRepo.save(schedule);

    await this.eventCategoryService.saveEventCategoriesById(item.id, [
      dto.eventCategoryId,
    ]);

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

  async findEventCategoriesById(id: number) {
    const items = await this.eventCategoryService.findCategoriesByEventId(id);
    const mappedItems = items.map((ec) => ({
      categoryId: ec.categoryId,
    }));
    return mappedItems;
  }

  async saveEventCategoriesById(id: number, body: any[]) {
    const listEventCategories = body.map((b) => b.categoryId);
    await this.eventCategoryService.saveEventCategoriesById(
      id,
      listEventCategories,
    );
  }

  findAllTest() {
    return this.repo.find();
  }
}
