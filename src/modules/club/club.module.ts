import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubLocationController } from './controllers/club-location.controller';
import { ClubLocationService } from './services/club-location.service';
import { ClubController } from './controllers/club.controller';
import { ClubContactController } from './controllers/club-contact.controller';
import { ClubCoverController } from './controllers/club-cover.controller';
import { ClubScheduleController } from './controllers/club-schedule.controller';
import { ClubSocialNetworkController } from './controllers/club-social-network.controller';
import { ClubService } from './club.service';
import { ClubSocialNetworkService } from './services/club-social-network.service';
import { ClubScheduleService } from './services/club-schedule.service';
import { ClubCoverService } from './services/club-cover.service';
import { ClubContactService } from './services/club-contact.service';
import { Club } from '@entities/club.entity';
import { ClubContact } from '@entities/club-contact.entity';
import { ClubCover } from '@entities/club-cover.entity';
import { ClubLocation } from '@entities/club-location.entity';
import { ClubSchedule } from '@entities/club-schedule.entity';
import { ClubSocialNetwork } from '@entities/club-social-network.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Club,
      ClubContact,
      ClubCover,
      ClubLocation,
      ClubSchedule,
      ClubSocialNetwork,
    ]),
  ],
  exports: [ClubService],
  controllers: [
    ClubController,
    ClubContactController,
    ClubCoverController,
    ClubLocationController,
    ClubScheduleController,
    ClubSocialNetworkController,
  ],
  providers: [
    ClubService,
    ClubContactService,
    ClubCoverService,
    ClubLocationService,
    ClubScheduleService,
    ClubSocialNetworkService,
  ],
})
export class ClubModule {}
