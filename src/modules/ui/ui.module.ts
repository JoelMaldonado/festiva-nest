import { Module } from '@nestjs/common';
import { UiService } from './ui.service';
import { UiController } from './ui.controller';
import { ClubModule } from '../club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppScreenEntity } from '@entities/app-screens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppScreenEntity]), ClubModule],
  controllers: [UiController],
  providers: [UiService],
})
export class UiModule {}
