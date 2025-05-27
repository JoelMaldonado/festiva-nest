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
import { UserEventService } from '../services/user-event.service';
import { errorResponse, successResponse } from 'src/common/responses';
import { IUserJwt } from 'src/modules/auth/auth.service';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user-event')
export class UserEventController {
  constructor(private readonly service: UserEventService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: Request, @Body('eventId') eventId: string) {
    try {
      const user = req['user'] as IUserJwt;
      const res = await this.service.create(user.id, Number(eventId));
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
