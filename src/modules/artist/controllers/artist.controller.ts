import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { errorResponse, successResponse } from '../../club/club.controller';
import { CreateArtistDto } from '../../../common/dto/create-artist.dto';

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

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() dto: CreateArtistDto) {
    try {
      const res = await this.artistService.create(dto);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const res = await this.artistService.delete(+id);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
