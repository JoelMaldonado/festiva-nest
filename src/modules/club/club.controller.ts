import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubDto } from './dto/club.dto';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  async create(@Body() dto: ClubDto) {
    return await this.clubService.create(dto);
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
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }
}

export function successResponse(message: string = '', data: any) {
  return {
    isSuccess: true,
    code: 200,
    message: message,
    data: data,
  };
}

export function errorResponse(error: any) {
  return {
    isSuccess: false,
    code: error.status ?? 500,
    message: error.message,
    data: null,
  };
}
