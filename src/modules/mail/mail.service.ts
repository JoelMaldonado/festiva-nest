import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend = new Resend('re_bs6YG2xW_DwchhzYe6YSbd56bKPGiJEC8');

  async sendEmail(
    name: string,
    email: string,
    clubName: string,
    address: string,
  ) {
    const { data, error } = await this.resend.emails.send({
      from: 'onboarding@resend.dev', // hardcodeado
      to: ['info@festiva.no'], // hardcodeado
      subject: 'Nuevo mensaje de contacto', // hardcodeado
      html: `
      <div style="font-family: Arial, sans-serif; padding: 16px; color: #333;">
      <h2>Nuevo mensaje desde el formulario de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Nombre del club:</strong> ${clubName}</p>
      <p><strong>Dirección:</strong> ${address}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 12px; color: #666;">
        Este correo fue generado automáticamente desde el formulario de contacto de Festiva.
      </p>
  </div>`,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
