import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { successResponse, errorResponse } from 'src/common/responses';
import { ClubPhoneService } from '../services/club-phone.service';

@Controller('club-phone')
export class ClubPhoneController {
  constructor(private readonly service: ClubPhoneService) {}

  @Get(':idClub')
  async findAll(@Param('idClub') idClub: number) {
    try {
      const res = await this.service.findAll(idClub);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post()
  async create(@Body('idClub') idClub: number, @Body('phone') phone: string) {
    try {
      const res = await this.service.create(idClub, phone);
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
