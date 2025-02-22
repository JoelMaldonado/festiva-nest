import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from '../evento/entities/evento.entity';
import { Artista } from '../artista/entities/artista.entity';
import { Discoteca } from '../discoteca/entities/discoteca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Artista, Discoteca])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
