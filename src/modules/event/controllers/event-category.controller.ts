import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventCategoryService } from '../services/event-category.service';
import { errorResponse, successResponse } from 'src/common/responses';
import { mapEventCategory } from '../mappers/event-category.mapper';

@Controller('event-category')
export class EventCategoryController {
  constructor(private readonly service: EventCategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query('status_id') statusId: number = 1) {
    try {
      const res = await this.service.findAll(Number(statusId));
      return successResponse('', res.map(mapEventCategory));
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const res = await this.service.findOne(+id);
      return successResponse('', mapEventCategory(res));
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body('title') title: string) {
    try {
      const res = await this.service.create(title);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body('title') title: string) {
    try {
      const res = await this.service.update(+id, title);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const res = await this.service.delete(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('restore/:id')
  async restore(@Param('id') id: string) {
    try {
      const res = await this.service.restore(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
