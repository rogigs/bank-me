import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { EmailDTO } from './DTO/email.DTO';
import { EmailService } from './email.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Email')
@Controller({ path: 'email', version: '1' })
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async sendMailer(@Body() body: EmailDTO) {
    this.emailService.sendMail(body);
  }
}
