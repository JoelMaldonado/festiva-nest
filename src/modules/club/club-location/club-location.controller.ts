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
import { ClubLocationService } from './club-location.service';
import { successResponse, errorResponse } from '../club.controller';
import { ClubLocationDto } from '../../../common/dto/club-location.dto';

@Controller('club')
export class ClubLocationController {
  constructor(private readonly clubLocationService: ClubLocationService) {}

  @Get(':id/locations')
  async findLocationsById(@Param('id', ParseIntPipe) id: number) {
    try {
      const items = await this.clubLocationService.findLocationsById(id);
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
      const item = await this.clubLocationService.createLocation(id, dto);
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
      const item = await this.clubLocationService.updateLocation(
        idLocation,
        dto,
      );
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Delete('/locations/:locationId')
  async deleteLocation(@Param('locationId', ParseIntPipe) locationId: number) {
    try {
      const item = await this.clubLocationService.deleteLocation(locationId);
      return successResponse('', item);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
