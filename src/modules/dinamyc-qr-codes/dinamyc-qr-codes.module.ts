import { Module } from '@nestjs/common';
import { DinamycQrCodesService } from './dinamyc-qr-codes.service';
import { DinamycQrCodesController } from './dinamyc-qr-codes.controller';

@Module({
  controllers: [DinamycQrCodesController],
  providers: [DinamycQrCodesService],
})
export class DinamycQrCodesModule {}
