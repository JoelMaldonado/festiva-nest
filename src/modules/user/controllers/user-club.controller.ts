import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserClubService } from '../services/user-club.service';
import { errorResponse, successResponse } from 'src/common/responses';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { IUserJwt } from 'src/modules/auth/auth.service';

@Controller('user-club')
export class UserClubController {
  constructor(private readonly service: UserClubService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: Request, @Body('clubId') clubId: string) {
    try {
      const user = req['user'] as IUserJwt;
      const res = await this.service.create(user.id, Number(clubId));
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    try {
      const user = req['user'] as IUserJwt;
      const res = await this.service.findAllByUserId(user.id);
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    try {
      const user = req['user'] as IUserJwt;
      const res = await this.service.remove(user.id, Number(id));
      return successResponse('', res);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
