import { EventScheduleEntity } from '@entities/event.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { EventService } from './event.service';

@Injectable()
export class EventScheduleService {
  constructor(
    @InjectRepository(EventScheduleEntity)
    private readonly eventScheduleRepo: Repository<EventScheduleEntity>,

    private readonly eventService: EventService,
  ) {}

  async findAll() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const list = await this.eventScheduleRepo.find({
      relations: ['event', 'event.club', 'event.eventCategory'],
      where: {
        eventDate: MoreThanOrEqual(yesterday),
        statusId: 1,
      },
    });
    const listMap = list.map((item) => {
      return {
        id: item.id,
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

  async findAllByEventId(eventId: number) {
    return this.eventScheduleRepo.find({ where: { event: { id: eventId } } });
  }

  async create(eventScheduleId: number, eventDate: string, startTime: string) {
    const eventSchedule = await this.eventScheduleRepo.findOne({
      relations: ['event'],
      where: { id: eventScheduleId },
    });

    if (!eventSchedule) {
      throw new Error('El evento no existe');
    }

    const item = this.eventScheduleRepo.create({
      event: eventSchedule.event,
      eventDate,
      startTime,
    });

    await this.eventScheduleRepo.save(item);
    return item.id;
  }
}
