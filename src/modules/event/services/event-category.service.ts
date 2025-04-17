import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from 'src/common/entities/event-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly repo: Repository<EventCategory>,
  ) {}

  async findAll() {
    const items = await this.repo.find();
    return items;
  }
}
