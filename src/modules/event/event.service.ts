import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from './entities/event-category.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,

    @InjectRepository(EventCategory)
    private readonly categoryRepo: Repository<EventCategory>,
  ) {}

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  async findAll() {
    return await this.repo.find({
      relations: ['eventArtists', 'eventArtists.artist'],
    });
  }

  async findAllCategory() {
    return await this.categoryRepo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Event not found');
    }
    return item;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
