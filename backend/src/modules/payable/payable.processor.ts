import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Payable } from '@prisma/client';
import { Job } from 'bull';
import { EmailService } from './../email/email.service';
import { UserService } from './../user/user.service';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

@Processor('payable')
export class PayableProcessor {
  constructor(
    private readonly payableService: PayableService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Process('createPayable')
  async handleCreatePayable(
    job: Job<{ data: Omit<PayableDto, 'id'>[]; user: string | undefined }>,
  ) {
    try {
      const { data, user } = job.data;

      if (data.length > 10000) {
        throw new Error('Exceeded the maximum allowed');
      }

      for (const payable of data) {
        await this.payableService.create(payable);
      }

      if (data.length >= 10) {
        return 'Successful';
      }

      if (user) {
        this.emailService.sendMail({
          to: (await this.userService.findOneById(user)).email,
          subject: 'Pagavéis processados com successo',
          message:
            'Seus pagavéis foram processados com sucesso, você já pode vê-los no seu perfil.',
        });

        return;
      }
    } catch (error) {
      if (job.attemptsMade < 4) {
        await job.retry();

        return;
      }

      await job.moveToFailed({ message: error.message }, true);

      // TODO: add agregator to send just one failed email notification
    }
  }

  @OnQueueFailed()
  async handleFailedJob(job: Job<PayableDto>, error: Error) {
    return error.message;
  }

  @OnQueueCompleted({ name: 'createPayable' })
  async onQueueCompletedCreatePayable(job: any, res: Payable) {
    this.payableService.setResult(res);

    return res;
  }
}
