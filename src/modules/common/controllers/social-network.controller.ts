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
  async findAll() {
    try {
      const res = await this.service.findAll();
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


}
