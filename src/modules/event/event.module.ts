import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../../common/entities/event.entity';
import { EventCategory } from '../../common/entities/event-category.entity';
import { EventArtist } from '../../common/entities/event-artist.entity';
import { EventCategoryService } from './services/event-category.service';
import { EventArtistService } from './services/event-artist.service';
import { EventArtistController } from './controllers/event-artist.controller';
import { EventCategoryController } from './controllers/event-category.controller';
import { EventService } from './services/event.service';
import { ClubModule } from '../club/club.module';
import { ArtistModule } from '../artist/artist.module';
import { EventScheduleEntity } from '@entities/event-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventArtist,
      EventCategory,
      EventEntity,
      EventScheduleEntity,
    ]),
    ClubModule,
    ArtistModule,
  ],
  exports: [EventService],
  controllers: [
    EventController,
    EventArtistController,
    EventCategoryController,
  ],
  providers: [EventService, EventCategoryService, EventArtistService],
})
export class EventModule {}
