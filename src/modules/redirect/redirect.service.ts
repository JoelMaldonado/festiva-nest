import { PlatformType, QrScansEntity } from '@entities/qr-scans.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RedirectService {
  constructor(
    @InjectRepository(QrScansEntity)
    private readonly qrScansRepository: Repository<QrScansEntity>,
  ) {}

  async logScan(platform: PlatformType, ip: string): Promise<QrScansEntity> {
    const scan = this.qrScansRepository.create({ platform, ip });
    return this.qrScansRepository.save(scan);
  }
}
