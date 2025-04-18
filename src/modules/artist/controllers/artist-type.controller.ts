import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArtistTypeService } from '../services/artist-type.service';
import { errorResponse, successResponse } from 'src/common/responses';
import { CreateArtistTypeDto } from 'src/common/dto/create-artist-type.dto';

@Controller('artist-type')
export class ArtistTypeController {
  constructor(private readonly service: ArtistTypeService) {}

  @Get()
  async findAll(@Query('status-id') statusId: number = 1) {
    try {
      const res = await this.service.findAll(Number(statusId));
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() dto: CreateArtistTypeDto) {
    try {
      const res = await this.service.create(dto);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: CreateArtistTypeDto) {
    try {
      const res = await this.service.update(id, dto);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const res = await this.service.delete(id);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('restore/:id')
  async restore(@Param('id') id: number) {
    try {
      const res = await this.service.restore(id);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
