import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { errorResponse, successResponse } from '../club/club.controller';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.artistService.findAll();
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const res = await this.artistService.findOne(+id);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
