import { ClubDto } from '@dtos/club.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { errorResponse, successResponse } from 'src/common/responses';
import { mapperClub } from 'src/common/mappers/club.mapper';
import { ClubService } from '../services/club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  async create(@Body() dto: ClubDto) {
    try {
      const res = await this.clubService.create(dto);
      return successResponse('Create club successfully', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('location/:id')
  async findAddress(@Param('id') id: string) {
    try {
      const item = await this.clubService.findOneLocation(+id);
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get(':id/covers')
  async findAllCovers(@Param('id') id: string) {
    try {
      const items = await this.clubService.findAllCovers(+id);
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get(':id/social-networks')
  async findAllSocialNetworks(@Param('id') id: string) {
    try {
      const items = await this.clubService.findAllSocialNetworks(+id);
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id', ParseIntPipe) id: number) {
    try {
      const items = await this.clubService.findSchedule(id);
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('detail')
  async findAll() {
    try {
      const items = await this.clubService.findAll();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }


  @Get('detail/:id')
  async findOne(@Param('id') id: number) {
    try {
      const item = await this.clubService.findOne(id);
      return successResponse('', mapperClub(item));
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('prueba')
  async prueba(
    @Query('idClub', ParseIntPipe) idClub: number,
    @Query('dayOfWeek', ParseIntPipe) dayOfWeek: number,
    @Query('time') time: string,
  ) {
    return this.clubService.prueba(idClub, dayOfWeek, time);
  }
}
