import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AssignorModule } from '../assignor/assignor.module';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { PayableController } from './payable.controller';
import { PayableProcessor } from './payable.processor';
import { PayableService } from './payable.service';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payable',
    }),
    AssignorModule,
    UserModule,
    EmailModule,
  ],
  controllers: [PayableController],
  providers: [PayableService, PayableProcessor],
})
export class PayableModule {}
