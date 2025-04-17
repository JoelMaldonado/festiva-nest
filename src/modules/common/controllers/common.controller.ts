import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { CommonService } from '../services/common.service';
import { errorResponse, successResponse } from 'src/common/responses';
@Controller('common')
export class CommonController {
  constructor(private readonly service: CommonService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    try {
      const res = await this.service.search(query);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
