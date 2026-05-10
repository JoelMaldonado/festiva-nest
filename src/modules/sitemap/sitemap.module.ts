import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventScheduleEntity } from '@entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventScheduleEntity])],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}
