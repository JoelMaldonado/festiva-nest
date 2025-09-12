import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
} from '@nestjs/common';
import { errorResponse, successResponse } from 'src/common/responses';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '@dtos/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly service: EventService) {}

  @Get()
  async findAll(@Query('clubId') clubId?: string) {
    try {
      const res = await this.service.findAll(clubId);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get('paged')
  async findAllPaged(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    try {
      const res = await this.service.findAllPaged(+page, +limit);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const res = await this.service.findEventScheduleById(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() dto: CreateEventDto) {
    try {
      const res = await this.service.create(dto);
      return successResponse('OK', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateEventDto) {
    try {
      const res = await this.service.update(+id, dto);
      return successResponse('OK', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const res = await this.service.remove(+id);
      return successResponse('OK', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('restore/:id')
  async restore(@Param('id') id: string) {
    try {
      const res = await this.service.restore(+id);
      return successResponse('OK', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
