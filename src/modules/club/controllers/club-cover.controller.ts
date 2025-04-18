import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
      const items = await this.service.create(idClub, imageUrl);
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
