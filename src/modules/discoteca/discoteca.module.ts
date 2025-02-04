import { Module } from '@nestjs/common';
import { DiscotecaService } from './discoteca.service';
import { DiscotecaController } from './discoteca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscotecaRedes } from './entities/discoteca-redes.entity';
import { Discoteca } from './entities/discoteca.entity';
import { HorarioAtencion } from './entities/horario-atencion.entity';
import { RedesModule } from '../redes/redes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiscotecaRedes,
      Discoteca,
      HorarioAtencion
    ]),
    RedesModule
  ],
  exports:[
    DiscotecaService
  ],
  controllers: [DiscotecaController],
  providers: [DiscotecaService],
})
export class DiscotecaModule {}
