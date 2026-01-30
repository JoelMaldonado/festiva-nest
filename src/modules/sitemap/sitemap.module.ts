import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { EventModule } from '../event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '@entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}
