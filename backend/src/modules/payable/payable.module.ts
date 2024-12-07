import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AssignorModule } from '../assignor/assignor.module';
import { EmailService } from '../email/email.service';
import { UserService } from './../user/user.service';
import { PayableController } from './payable.controller';
import { PayableProcessor } from './payable.processor';
import { PayableService } from './payable.service';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payable',
    }),
    AssignorModule,
  ],
  controllers: [PayableController],
  providers: [EmailService, PayableService, UserService, PayableProcessor],
})
export class PayableModule {}
