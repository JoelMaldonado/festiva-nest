import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventArtistService } from '../services/event-artist.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('event-artist')
export class EventArtistController {
  constructor(private readonly service: EventArtistService) {}

  @Get(':idEvent')
  async findAll(@Param('idEvent') idEvent: number) {
    try {
      const res = await this.service.findAll(idEvent);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post(':idEvent')
  async create(
    @Param('idEvent') idEvent: number,
    @Body('artistId') artistId: number,
  ) {
    try {
      const res = await this.service.create(idEvent, artistId);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
