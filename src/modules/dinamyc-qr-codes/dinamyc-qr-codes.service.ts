import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DinamycQrCodesService {
  constructor(private readonly prismaService: PrismaService) {}

  test() {
  return this.prismaService.dynamic_qr_codes.findMany();  
  }
}
