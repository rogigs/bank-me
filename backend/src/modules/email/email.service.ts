import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDTO } from './DTO/email.DTO';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(email: EmailDTO) {
    this.mailService.sendMail({
      from: process.env.EMAIL_DELIVERY,
      to: email.to,
      subject: email.subject,
      text: email.message,
    });
  }
}
