import { Module } from '@nestjs/common';
import { UiService } from './ui.service';
import { UiController } from './ui.controller';
import { ClubModule } from '../club/club.module';

@Module({
  imports: [ClubModule],
  controllers: [UiController],
  providers: [UiService],
})
export class UiModule {}
