import { Controller, Get } from '@nestjs/common';
import { ArtistTypeService } from '../services/artist-type.service';
import {
  errorResponse,
  successResponse,
} from 'src/modules/club/club.controller';

@Controller('artist-type')
export class ArtistTypeController {
  constructor(private readonly service: ArtistTypeService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.service.findAll();
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
