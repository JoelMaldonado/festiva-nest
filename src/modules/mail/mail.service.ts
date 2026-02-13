import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend = new Resend('re_bs6YG2xW_DwchhzYe6YSbd56bKPGiJEC8');

  private readonly RECAPTCHA_MIN_SCORE = 0.5; // ajustable
  private readonly EXPECTED_ACTION = 'contact_form';

  async sendEmail(
    name: string,
    email: string,
    clubName: string,
    address: string,
    recaptchaToken: string,
    recaptchaAction: string,
  ) {
    // 1) Verificar reCAPTCHA antes de enviar email
    await this.verifyRecaptcha(
      recaptchaToken,
      recaptchaAction || this.EXPECTED_ACTION,
    );

    // 2) Enviar email
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

  private async verifyRecaptcha(token: string, expectedAction: string) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      throw new InternalServerErrorException('Missing RECAPTCHA_SECRET_KEY');
    }

    const body = new URLSearchParams();
    body.append('secret', secret);
    body.append('response', token);

    const resp = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      },
    );

    const data = (await resp.json()) as RecaptchaVerifyResponse;

    if (!data.success) {
      throw new ForbiddenException({
        message: 'recaptcha_failed',
        codes: data['error-codes'] ?? [],
      });
    }

    // Acción debe coincidir
    if (data.action !== expectedAction) {
      throw new ForbiddenException({
        message: 'recaptcha_bad_action',
        action: data.action,
      });
    }

    // Score mínimo
    const score = data.score ?? 0;
    if (score < this.RECAPTCHA_MIN_SCORE) {
      throw new ForbiddenException({
        message: 'recaptcha_low_score',
        score,
      });
    }

    return { score, hostname: data.hostname };
  }
}

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};
