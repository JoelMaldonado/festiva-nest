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
      return errorResponse(error.status, error.message);
    }
  }

  @Get('detail')
  async findAll() {
    try {
      const items = await this.clubService.findAll();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error.status, error.message);
    }
  }

  @Get('detail/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const item = await this.clubService.findOne(id);
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error.status, error.message);
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

export function errorResponse(code: number, message: string) {
  return {
    isSuccess: false,
    code: code ?? 500,
    message: message,
    data: null,
  };
}
