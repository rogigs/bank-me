import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { EmailDto } from './dto/email.dto';
import { EmailService } from './email.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Email')
@Controller({ path: 'email', version: '1' })
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendMailer(@Body() body: EmailDto) {
    this.emailService.sendMail(body);

    return 'Sucesso';
  }
}
