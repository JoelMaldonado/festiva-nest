import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UiService } from './ui.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('ui')
export class UiController {
  constructor(private readonly service: UiService) {}

  @Get('club')
  async findAllUiClub() {
    try {
      const items = await this.service.findAllUiClub();
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
