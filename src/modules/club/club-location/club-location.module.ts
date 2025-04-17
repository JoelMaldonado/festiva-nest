import { Module } from '@nestjs/common';
import { ClubLocationService } from './club-location.service';
import { ClubLocationController } from './club-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubLocation } from '../../../common/entities/club-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClubLocation])],
  controllers: [ClubLocationController],
  providers: [ClubLocationService],
})
export class ClubLocationModule {}
