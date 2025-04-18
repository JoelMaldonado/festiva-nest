import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { errorResponse, successResponse } from 'src/common/responses';
import { ClubCoverService } from '../services/club-cover.service';

@Controller('club-cover')
export class ClubCoverController {
  constructor(private readonly service: ClubCoverService) {}

  @Get(':idClub')
  async findAll(@Param('idClub') idClub: number) {
    try {
      const items = await this.service.findAll(idClub);
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post(':idClub')
  async create(
    @Param('idClub') idClub: number,
    @Body('imageUrl') imageUrl: string,
  ) {
    try {
      const res = await this.service.create(idClub, imageUrl);
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
