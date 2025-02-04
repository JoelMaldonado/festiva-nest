import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { EventoArtista } from './entities/evento.artista';
import { CatEventoModule } from '../cat-evento/cat-evento.module';
import { DiscotecaModule } from '../discoteca/discoteca.module';
import { ArtistaModule } from '../artista/artista.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evento, EventoArtista]),
    CatEventoModule,
    DiscotecaModule,
    ArtistaModule
  ],
  controllers: [EventoController],
  providers: [EventoService],
})
export class EventoModule {}
