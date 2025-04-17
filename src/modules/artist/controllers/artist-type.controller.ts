import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArtistTypeService } from '../services/artist-type.service';
import {
  errorResponse,
  successResponse,
} from 'src/modules/club/club.controller';

@Controller('artist-type')
export class ArtistTypeController {
  constructor(private readonly service: ArtistTypeService) {}

  @Get()
  async findAll(@Query('status-id') statusId: number) {
    try {
      const res = await this.service.findAll(statusId);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
