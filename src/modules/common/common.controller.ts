import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { CommonService } from './common.service';
import { errorResponse, successResponse } from '../club/club.controller';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    try {
      const res = await this.commonService.search(query);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @Get('social-network')
  async findAllSocialNetwork() {
    try {
      const res = await this.commonService.findAllSocialNetwork();
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
