import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClubLocationDto } from '../../../common/dto/club-location.dto';
import { ClubLocationService } from '../services/club-location.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('club')
export class ClubLocationController {
  constructor(private readonly service: ClubLocationService) {}

  @Get('/locations')
  async findAllLocations() {
    try {
      const items = await this.service.findAllLocations();
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get(':id/locations')
  async findLocationsById(@Param('id', ParseIntPipe) id: number) {
    try {
      const items = await this.service.findLocationsById(id);
      return successResponse('', items);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post(':id/locations')
  async createLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ClubLocationDto,
  ) {
    try {
      const item = await this.service.createLocation(id, dto);
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Patch('locations/:idLocation')
  async updateLocation(
    @Param('idLocation', ParseIntPipe) idLocation: number,
    @Body() dto: ClubLocationDto,
  ) {
    try {
      const item = await this.service.updateLocation(idLocation, dto);
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Delete('/locations/:locationId')
  async deleteLocation(@Param('locationId', ParseIntPipe) locationId: number) {
    try {
      const item = await this.service.deleteLocation(locationId);
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
