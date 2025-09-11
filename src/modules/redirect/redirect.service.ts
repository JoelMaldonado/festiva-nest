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

  async logScan(platform: PlatformType): Promise<QrScansEntity> {
    const scan = this.qrScansRepository.create({ platform });
    return this.qrScansRepository.save(scan);
  }
}
