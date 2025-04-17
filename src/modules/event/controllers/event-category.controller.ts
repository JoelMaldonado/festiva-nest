import { Controller, Get } from '@nestjs/common';
import { EventCategoryService } from '../services/event-category.service';
import { errorResponse, successResponse } from 'src/modules/club/club.controller';

@Controller('event-category')
export class EventCategoryController {
  constructor(private readonly service: EventCategoryService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.service.findAll();
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
