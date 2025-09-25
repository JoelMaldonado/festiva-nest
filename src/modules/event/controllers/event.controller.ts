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

  @Get('filtered')
  async findAllFiltered(@Query('day') day: string) {
    try {
      const res = await this.service.findAllFiltered(day);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get('weekdays')
  async getEventWeekdays() {
    try {
      const res = await this.service.getEventWeekdays();
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get('paged')
  async findAllPaged(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('categoryId') categoryId?: string,
    @Query('date') date?: string,
    @Query('search') search?: string,
  ) {
    try {
      const res = await this.service.findAllPaged(
        +page,
        +limit,
        categoryId,
        date,
        search,
      );
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get(':id/categories')
  async findEventCategoriesById(@Param('id') id: string) {
    try {
      const res = await this.service.findEventCategoriesById(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Post(':id/categories')
  async saveEventCategoriesById(@Param('id') id: string, @Body() body: any) {
    try {
      await this.service.saveEventCategoriesById(+id, body);
      return successResponse('Event Categories Saved', null);
    } catch (err) {
      return errorResponse(err);
    }
  }

  // Filtra detalle del evento por ID
  @Get('detail/:id')
  async findById(@Param('id') id: string) {
    try {
      const res = await this.service.findOneById(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  // Filtra EventSchedule por ID
  @Get('schedule/:id')
  async findEventByScheduleId(@Param('id') id: string) {
    try {
      const res = await this.service.findEventScheduleById(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get(':id')
  async findEventByScheduleIdToDelete(@Param('id') id: string) {
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
