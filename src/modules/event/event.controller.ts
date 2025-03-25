import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { errorResponse, successResponse } from '../club/club.controller';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  async findAll() {
    try {
      const res = await this.eventService.findAll();
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get('category')
  async findAllCategory() {
    try {
      const res = await this.eventService.findAllCategory();
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const res = await this.eventService.findOne(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
