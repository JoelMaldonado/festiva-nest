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
import { errorResponse, successResponse } from 'src/common/responses';
import { SocialNetworkService } from '../services/social-network.service';
import { toSocialNetworkResponse } from 'src/common/mappers/common.mapper';

@Controller('common/social-network')
export class SocialNetworkController {
  constructor(private readonly service: SocialNetworkService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query('status_id') statusId: number = 1) {
    try {
      const res = await this.service.findAll(Number(statusId));
      return successResponse('', res.map(toSocialNetworkResponse));
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const res = await this.service.findOne(+id);
      return successResponse('', toSocialNetworkResponse(res));
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body('name') name: string,
    @Body('logoUrl') logoUrl: string,
    @Body('imagePath') imagePath: string,
  ) {
    try {
      const res = await this.service.create(name, logoUrl, imagePath);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('logoUrl') logoUrl: string,
    @Body('imagePath') imagePath: string,
  ) {
    try {
      const res = await this.service.update(+id, name, logoUrl, imagePath);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const res = await this.service.delete(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('restore/:id')
  async restore(@Param('id') id: string) {
    try {
      const res = await this.service.restore(+id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
