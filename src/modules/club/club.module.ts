import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { ClubContact } from './entites/club-contact.entity';
import { ClubCover } from './entites/club-cover.entity';
import { ClubLocation } from './entites/club-location.entity';
import { ClubSocialNetwork } from './entites/club-social-network.entity';
import { Club } from './entites/club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClubContact,
      ClubCover,
      ClubLocation,
      ClubSocialNetwork,
      Club,
    ]),
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
