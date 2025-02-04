import { Module } from '@nestjs/common';
import { RedesService } from './redes.service';
import { RedesController } from './redes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Redes } from './entities/redes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Redes])],
  exports: [RedesService],
  controllers: [RedesController],
  providers: [RedesService],
})
export class RedesModule {}
