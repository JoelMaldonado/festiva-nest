import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubContact } from '../../common/entities/club-contact.entity';
import { ClubCover } from '../../common/entities/club-cover.entity';
import { ClubLocation } from '../../common/entities/club-location.entity';
import { ClubSocialNetwork } from '../../common/entities/club-social-network.entity';
import { Club } from '../../common/entities/club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubSchedule } from '../../common/entities/club-schedule.entity';
import { ClubLocationController } from './controllers/club-location.controller';
import { ClubLocationService } from './services/club-location.service';
import { ClubController } from './controllers/club.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClubContact,
      ClubCover,
      ClubLocation,
      ClubSchedule,
      ClubSocialNetwork,
      Club,
    ]),
  ],
  controllers: [ClubController, ClubLocationController],
  providers: [ClubService, ClubLocationService],
})
export class ClubModule {}
