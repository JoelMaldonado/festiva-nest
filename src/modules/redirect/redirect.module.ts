import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrScansEntity } from '@entities/qr-scans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QrScansEntity])],
  controllers: [RedirectController],
  providers: [RedirectService],
})
export class RedirectModule {}
