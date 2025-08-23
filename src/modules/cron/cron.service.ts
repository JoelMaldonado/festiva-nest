import { Injectable, Logger } from '@nestjs/common';
import { CommonService } from '../common/services/common.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { delay } from 'rxjs';

@Injectable()
export class CronService {
  constructor(private readonly commonService: CommonService) {}

  //@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleClubRatingsCron() {
    //await this.commonService.getClubRating();
  }
}
