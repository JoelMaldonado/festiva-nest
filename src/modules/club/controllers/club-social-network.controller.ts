import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClubSocialNetworkService } from '../services/club-social-network.service';
import { errorResponse, successResponse } from 'src/common/responses';
import { ClubSocialNetworkDto } from '@dtos/club.dto';
import { mapperClubSchedule } from 'src/common/mappers/club.mapper';

@Controller('club-social-network')
export class ClubSocialNetworkController {
  constructor(private readonly service: ClubSocialNetworkService) {}

  @Get()
  async findAll(@Query('idClub') idClub: number) {
    try {
      const res = await this.service.findAll(idClub);
      return successResponse('', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post()
  async create(@Body() dto: ClubSocialNetworkDto) {
    try {
      const res = await this.service.create(dto);
      return successResponse('', res);
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
