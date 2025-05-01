import { ClubDto } from '@dtos/club.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { errorResponse, successResponse } from 'src/common/responses';
import { ClubService } from '../club.service';
import { toClubResponse } from 'src/common/mappers/club.mapper';

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

  @Get('address')
  async findAllAddress() {
    try {
      const items = await this.clubService.findAllAddress();
      return successResponse('', items);
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const item = await this.clubService.findOne(id);
      return successResponse('', toClubResponse(item));
    } catch (error) {
      return errorResponse(error);
    }
  }
}
