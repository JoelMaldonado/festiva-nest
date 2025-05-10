import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ArtistSocialNetworkService } from '../services/artist-social-network.service';
import { successResponse, errorResponse } from 'src/common/responses';
import { mapperArtistSocialNetwork } from 'src/common/mappers/artist.mapper';

@Controller('artist-social-network')
export class ArtistSocialNetworkController {
  constructor(private readonly service: ArtistSocialNetworkService) {}

  @Get()
  async findAll(@Query('idArtist') idArtist: string) {
    try {
      const res = await this.service.findAll(Number(idArtist));
      return successResponse('OK', res.map(mapperArtistSocialNetwork));
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post()
  async create(
    @Body('idArtist') idArtist: number,
    @Body('url') url: string,
    @Body('socialNetworkId') socialNetworkId: number,
  ) {
    try {
      const res = await this.service.create(idArtist, url, socialNetworkId);
      return successResponse('OK', res);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const res = await this.service.delete(Number(id));
      return successResponse('OK', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
