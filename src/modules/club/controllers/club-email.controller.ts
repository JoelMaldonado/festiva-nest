import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { errorResponse, successResponse } from 'src/common/responses';
import { ClubEmailService } from '../services/club-email.service';

@Controller('club-email')
export class ClubEmailController {
  constructor(private readonly service: ClubEmailService) {}

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
  async create(@Body('idClub') idClub: number, @Body('email') email: string) {
    try {
      const res = await this.service.create(idClub, email);
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
