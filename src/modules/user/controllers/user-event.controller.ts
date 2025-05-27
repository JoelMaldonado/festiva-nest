import { Controller } from '@nestjs/common';
import { UserEventService } from '../services/user-event.service';

@Controller('user-event')
export class UserEventController {
  constructor(private readonly service: UserEventService) {}
}
