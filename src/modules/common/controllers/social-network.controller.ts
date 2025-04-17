import { Controller, Get } from '@nestjs/common';
import {
  errorResponse,
  successResponse,
} from 'src/modules/club/club.controller';
import { SocialNetworkService } from '../services/social-network.service';

@Controller('common/social-network')
export class SocialNetworkController {
  constructor(private readonly service: SocialNetworkService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.service.findAll();
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
