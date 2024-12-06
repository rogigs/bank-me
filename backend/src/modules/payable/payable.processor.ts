import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Payable } from '@prisma/client';
import { Job } from 'bull';
import { JwtPayload } from 'src/types/jwt-payload.type';
import { EmailService } from './../email/email.service';
import { UserService } from './../user/user.service';
import { PayableNoBaseModel } from './dto/payable-no-base-model.dto';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

type ParamsCreateMany = {
  data: PayableNoBaseModel[];
  user: JwtPayload;
  longProcess: boolean;
};

@Processor('payable')
export class PayableProcessor {
  constructor(
    private readonly payableService: PayableService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Process({ name: 'createPayable', concurrency: 4 })
  async handleCreatePayable(job: Job<ParamsCreateMany>) {
    try {
      const { data, user, longProcess } = job.data;

      if (data.length > 10000) {
        throw new Error('Exceeded the maximum allowed');
      }

      for (const payable of data) {
        await this.payableService.create(payable);
      }

      if (user && longProcess) {
        const userDB = await this.userService.findOneById(user.id);

        if (!(userDB instanceof Error)) {
          this.emailService.sendMail({
            to: userDB.email,
            subject: 'Pagavéis processados com successo',
            message:
              'Seus pagavéis foram processados com sucesso, você já pode vê-los no seu perfil.',
          });
        }

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
