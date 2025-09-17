import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendTestEmail(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('clubName') clubName: string,
    @Body('address') address: string,
  ) {
    return this.mailService.sendEmail(name, email, clubName, address);
  }
}
