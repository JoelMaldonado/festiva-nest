import { UserEventEntity } from '@entities/user-event.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserEventService {
  constructor(
    @InjectRepository(UserEventEntity)
    private readonly userAuthRepo: Repository<UserEventEntity>,
  ) {}
}
