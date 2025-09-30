import { Controller, Get, Param } from '@nestjs/common';
import { UiService } from './ui.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('ui')
export class UiController {
  constructor(private readonly service: UiService) {}

  @Get('screens')
  async findAllUiScreens() {
    try {
      const items = await this.service.findAllUiScreens();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('club')
  async findAllUiClub() {
    try {
      const items = await this.service.findAllUiClub();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('v2/club')
  async findAllUiClubV2() {
    try {
      const items = await this.service.findAllUiClubV2(false);
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

  @Get('home')
  async findAllUiHome() {
    try {
      const items = await this.service.findAllUiHome();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('v2/home')
  async findAllUiHomeV2() {
    try {
      const items = await this.service.findAllUiHomeV2();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('home/test')
  async findAllUiHomeTest() {
    try {
      const items = await this.service.findAllUiHomeTest();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
