import { Module } from '@nestjs/common';
import { CatEventoService } from './cat-evento.service';
import { CatEventoController } from './cat-evento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEvento } from './entities/cat-evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEvento])],
  exports: [
    CatEventoService
  ],
  controllers: [CatEventoController],
  providers: [CatEventoService],
})
export class CatEventoModule {}
