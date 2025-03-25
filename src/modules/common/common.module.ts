import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { SocialNetwork } from './entities/social-network.entity';
import { Event } from '../event/entities/event.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Club } from '../club/entites/club.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Artist, Club, Status, SocialNetwork]),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
