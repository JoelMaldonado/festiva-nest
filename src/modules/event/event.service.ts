import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from '../../common/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from '../../common/entities/event-category.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,

    @InjectRepository(EventCategory)
    private readonly categoryRepo: Repository<EventCategory>,
  ) {}


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

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
