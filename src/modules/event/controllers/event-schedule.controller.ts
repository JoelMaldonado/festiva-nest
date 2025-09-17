import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { EventScheduleService } from '../services/event-schedule.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('event-schedule')
export class EventScheduleController {
  constructor(private readonly service: EventScheduleService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.service.findAll();
      return successResponse('OK', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get(':eventId')
  async findAllByEventId(@Param('eventId') eventId: string) {
    try {
      if (isNaN(+eventId)) {
        throw new BadRequestException('El eventId debe ser un número válido');
      }

      const res = await this.service.findAllByEventId(+eventId);

      return successResponse('OK', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Post()
  async create(
    @Body('eventId') eventId: string,
    @Body('eventDate') eventDate: string,
    @Body('startTime') startTime: string,
  ) {
    try {
      if (isNaN(+eventId)) {
        throw new BadRequestException('El eventId debe ser un número válido');
      }

      const res = await this.service.create(+eventId, eventDate, startTime);

      return successResponse('OK', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
