import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EventEntity,
  EventScheduleEntity,
} from '../../common/entities/event.entity';
import { CategoryEntity } from '../../common/entities/category.entity';
import { EventArtist } from '../../common/entities/event-artist.entity';
import { EventCategoryService } from './services/event-category.service';
import { EventArtistService } from './services/event-artist.service';
import { EventArtistController } from './controllers/event-artist.controller';
import { EventCategoryController } from './controllers/event-category.controller';
import { EventService } from './services/event.service';
import { ClubModule } from '../club/club.module';
import { ArtistModule } from '../artist/artist.module';
import { EventScheduleController } from './controllers/event-schedule.controller';
import { EventScheduleService } from './services/event-schedule.service';
import { EventCategoryEntity } from '@entities/event-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventArtist,
      CategoryEntity,
      EventEntity,
      EventScheduleEntity,
      EventCategoryEntity,
    ]),
    ClubModule,
    ArtistModule,
  ],
  exports: [EventService],
  controllers: [
    EventController,
    EventArtistController,
    EventCategoryController,
    EventScheduleController,
  ],
  providers: [
    EventService,
    EventCategoryService,
    EventArtistService,
    EventScheduleService,
  ],
})
export class EventModule {}
