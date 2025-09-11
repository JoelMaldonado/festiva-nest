import { PlatformType, QrScansEntity } from '@entities/qr-scans.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as path from 'path';
import { Repository } from 'typeorm';
import * as QRCode from 'qrcode';
const sharp = require('sharp');
import * as fs from 'fs'

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

  private logoPath = path.resolve(__dirname, '../../../assets/logo3.png'); // pon tu ruta

  async makePngWithLogoBox(
    url: string,
    size = 1024,
    holeScale = 0.26,
    logoInset = 0.12,
    cornerRadiusPct = 0.12, // radio esquinas redondeadas de la ventana
  ): Promise<Buffer> {
    // 1) QR base
    const qrPng = await QRCode.toBuffer(url, {
      errorCorrectionLevel: 'H',
      margin: 4,
      scale: Math.max(4, Math.floor(size / 80)),
      //color: { dark: '#1D1D1D', light: '#FF4081' },
      color: { dark: '#ffffffff', light: '#1D1D1D' },
    });

    const meta = await sharp(qrPng).metadata();
    const W = meta.width ?? size;
    const H = meta.height ?? size;

    // 2) “Ventana” central: rectángulo blanco con esquinas redondeadas
    const holeW = Math.floor(W * holeScale);
    const holeH = Math.floor(H * holeScale);
    const left = Math.floor((W - holeW) / 2);
    const top = Math.floor((H - holeH) / 2);

    // SVG de la ventana blanca (limpia módulos debajo)
    const rx = Math.floor(holeW * cornerRadiusPct);
    const ry = Math.floor(holeH * cornerRadiusPct);
    const holeSvg = Buffer.from(
      `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
         <rect x="${left}" y="${top}" width="${holeW}" height="${holeH}" rx="${rx}" ry="${ry}" fill="#1D1D1D"/>
       </svg>`
    );

    // 3) Componer: QR + ventana
    let img = await sharp(qrPng)
      .composite([{ input: holeSvg }]) // pinta blanco, borra módulos debajo
      .png()
      .toBuffer();

    // 4) Logo dentro de la ventana (un poco más pequeño para dejar margen)
    const logoBuf = fs.readFileSync(this.logoPath);
    const logoMaxW = Math.floor(holeW * (1 - logoInset));
    const logoMaxH = Math.floor(holeH * (1 - logoInset));
    const logoResized = await sharp(logoBuf)
      .resize(logoMaxW, logoMaxH, { fit: 'inside' }) // respeta proporción
      .png()
      .toBuffer();

    const logoMeta = await sharp(logoResized).metadata();
    const logoLeft = Math.floor(left + (holeW - (logoMeta.width ?? logoMaxW)) / 2);
    const logoTop = Math.floor(top + (holeH - (logoMeta.height ?? logoMaxH)) / 2);

    // 5) Componer logo centrado
    img = await sharp(img)
      .composite([{ input: logoResized, left: logoLeft, top: logoTop }])
      .png()
      .toBuffer();

    return img;
  }
  
}
