import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { successResponse } from 'src/common/responses';

@Controller('health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get()
  checkHealth() {
    const res = this.service.checkHealth();
    return successResponse('', res);
  }
}
