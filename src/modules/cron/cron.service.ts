import { Injectable, Logger } from '@nestjs/common';
import { CommonService } from '../common/services/common.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { delay } from 'rxjs';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly commonService: CommonService) {}

  //@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron('0 0 1,15 * *') // a medianoche el día 1 y el 15
  async handleClubRatingsCron() {
    this.logger.log('Ejecutando cron de actualización de ratings...');
    await this.commonService.getClubRating();
    this.logger.log('Cron finalizado correctamente');
  }
}
