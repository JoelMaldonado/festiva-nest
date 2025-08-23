import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [CronService],
})
export class CronModule {}
