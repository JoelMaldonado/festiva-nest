import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { ClubContact } from '../../common/entities/club-contact.entity';
import { ClubCover } from '../../common/entities/club-cover.entity';
import { ClubLocation } from '../../common/entities/club-location.entity';
import { ClubSocialNetwork } from '../../common/entities/club-social-network.entity';
import { Club } from '../../common/entities/club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubSchedule } from '../../common/entities/club-schedule.entity';
import { ClubLocationModule } from './club-location/club-location.module';

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
    ClubLocationModule,
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
