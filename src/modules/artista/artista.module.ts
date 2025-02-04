import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { ArtistaRedes } from './entities/artista-redes.entity';
import { RedesModule } from '../redes/redes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artista, ArtistaRedes]), RedesModule],
  exports: [ArtistaService],
  controllers: [ArtistaController],
  providers: [ArtistaService],
})
export class ArtistaModule {}
