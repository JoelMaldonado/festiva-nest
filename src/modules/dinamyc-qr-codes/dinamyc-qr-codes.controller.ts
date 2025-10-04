import { Controller, Get } from '@nestjs/common';
import { DinamycQrCodesService } from './dinamyc-qr-codes.service';
import { errorResponse, successResponse } from 'src/common/responses';

@Controller('dinamyc-qr-codes')
export class DinamycQrCodesController {
  constructor(private readonly service: DinamycQrCodesService) {}

  @Get()
  async test() {
    try {
      const res = await this.service.test();
      return successResponse('Dinamyc QR Codes fetched successfully', res);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
