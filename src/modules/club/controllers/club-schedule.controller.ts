import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClubScheduleService } from '../services/club-schedule.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('club-schedule')
export class ClubScheduleController {
  constructor(private readonly service: ClubScheduleService) {}

  @Get(':idClub')
  async findAll(@Param('idClub') idClub: number) {
    try {
      const res = await this.service.findAll(idClub);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post(':idClub')
  async create(
    @Param('idClub') idClub: number,
    @Body('dayOfWeek') dayOfWeek: number,
    @Body('openingTime') openingTime: string,
    @Body('closingTime') closingTime: string,
  ) {
    try {
      const res = await this.service.create(
        idClub,
        dayOfWeek,
        openingTime,
        closingTime,
      );
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const res = await this.service.delete(id);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
