import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../common/entities/event.entity';
import { EventCategory } from '../../common/entities/event-category.entity';
import { EventArtist } from '../../common/entities/event-artist.entity';
import { EventCategoryService } from './services/event-category.service';
import { EventArtistService } from './services/event-artist.service';
import { EventArtistController } from './controllers/event-artist.controller';
import { EventCategoryController } from './controllers/event-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventArtist, EventCategory, Event])],
  controllers: [
    EventController,
    EventArtistController,
    EventCategoryController,
  ],
  providers: [EventService, EventCategoryService, EventArtistService],
})
export class EventModule {}
