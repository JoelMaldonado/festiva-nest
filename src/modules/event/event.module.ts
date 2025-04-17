import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../common/entities/event.entity';
import { EventCategory } from '../../common/entities/event-category.entity';
import { EventArtist } from '../../common/entities/event-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventArtist, EventCategory, Event])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
