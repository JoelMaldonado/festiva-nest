import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubLocationController } from './controllers/club-location.controller';
import { ClubLocationService } from './services/club-location.service';
import { ClubController } from './controllers/club.controller';
import { ClubCoverController } from './controllers/club-cover.controller';
import { ClubScheduleController } from './controllers/club-schedule.controller';
import { ClubSocialNetworkController } from './controllers/club-social-network.controller';
import { ClubSocialNetworkService } from './services/club-social-network.service';
import { ClubScheduleService } from './services/club-schedule.service';
import { ClubCoverService } from './services/club-cover.service';
import { Club } from '@entities/club.entity';
import { ClubCover } from '@entities/club-cover.entity';
import { ClubLocation } from '@entities/club-location.entity';
import { ClubSchedule } from '@entities/club-schedule.entity';
import { ClubSocialNetwork } from '@entities/club-social-network.entity';
import { ClubEmailEntity } from '@entities/club-email.entity';
import { ClubEmailController } from './controllers/club-email.controller';
import { ClubEmailService } from './services/club-email.service';
import { ClubPhoneController } from './controllers/club-phone.controller';
import { ClubPhoneService } from './services/club-phone.service';
import { ClubPhoneEntity } from '@entities/club-phone.entity';
import { ClubService } from './services/club.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Club,
      ClubEmailEntity,
      ClubPhoneEntity,
      ClubCover,
      ClubLocation,
      ClubSchedule,
      ClubSocialNetwork,
    ]),
    CommonModule,
  ],
  exports: [ClubService, ClubScheduleService],
  controllers: [
    ClubController,
    ClubEmailController,
    ClubPhoneController,
    ClubCoverController,
    ClubLocationController,
    ClubScheduleController,
    ClubSocialNetworkController,
  ],
  providers: [
    ClubService,
    ClubEmailService,
    ClubPhoneService,
    ClubCoverService,
    ClubLocationService,
    ClubScheduleService,
    ClubSocialNetworkService,
  ],
})
export class ClubModule {}
