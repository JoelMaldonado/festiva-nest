import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UiService } from './ui.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('ui')
export class UiController {
  constructor(private readonly service: UiService) {}

  @Get('club')
  async findAllUiClub(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
  ) {
    try {
      const items = await this.service.findAllUiClub(page, limit);
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('club/:id')
  async findOneUiDetail(@Param('id') id: number) {
    try {
      const item = await this.service.findOneUiDetail(id);
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
