import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArtistTagService } from '../services/artist-tag.service';
import { errorResponse, successResponse } from 'src/common/responses';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('artist-tag')
export class ArtistTagController {
  constructor(private readonly service: ArtistTagService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('idArtist') idArtist: string) {
    try {
      const res = await this.service.findAll(Number(idArtist));
      return successResponse('OK', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post()
  async create(@Body('idArtist') idArtist: number, @Body('name') name: string) {
    try {
      const res = await this.service.create(idArtist, name);
      return successResponse('OK', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const res = await this.service.delete(Number(id));
      return successResponse('OK', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
