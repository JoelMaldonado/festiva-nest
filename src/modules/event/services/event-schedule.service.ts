import { EventScheduleEntity } from '@entities/event.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventService } from './event.service';

@Injectable()
export class EventScheduleService {
  constructor(
    @InjectRepository(EventScheduleEntity)
    private readonly eventScheduleRepo: Repository<EventScheduleEntity>,

    private readonly eventService: EventService,
  ) {}

  async findAllByEventId(eventId: number) {
    return this.eventScheduleRepo.find({ where: { event: { id: eventId } } });
  }

  async create(eventId: number, eventDate: string, startTime: string) {
    const event = await this.eventService.findOneById(eventId);

    const item = this.eventScheduleRepo.create({
      event: event,
      eventDate,
      startTime,
    });

    await this.eventScheduleRepo.save(item);
    return item.id;
  }
}
