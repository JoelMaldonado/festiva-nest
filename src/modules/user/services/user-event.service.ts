import { UserEventEntity } from '@entities/user-event.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { EventService } from 'src/modules/event/services/event.service';

@Injectable()
export class UserEventService {
  constructor(
    @InjectRepository(UserEventEntity)
    private readonly repository: Repository<UserEventEntity>,

    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  async create(userId: number, eventId: number) {
    const ifExists = await this.repository.findOne({
      where: {
        user: { id: userId },
        event: { id: eventId },
      },
    });
    if (ifExists) {
      throw new ConflictException('Event already registered for this user');
    }

    const user = await this.userService.findOne(userId);

    const event = await this.eventService.findOne(eventId);

    const userEvent = this.repository.create({
      user: user,
      event: event,
    });

    await this.repository.save(userEvent);

    return userEvent.id;
  }

  async findAllByUserId(userId: number) {
    return await this.repository.find({
      relations: ['user', 'event'],
      where: {
        user: { id: userId },
      },
    });
  }

  async remove(userId: number, id: number) {
    const userEvent = await this.repository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });

    if (!userEvent) {
      throw new ConflictException('Event not found for this user');
    }

    await this.repository.remove(userEvent);
  }
}
