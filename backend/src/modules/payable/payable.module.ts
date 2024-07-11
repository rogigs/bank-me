import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
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
  providers: [
    EmailService,
    PayableService,
    UserService,
    PrismaService,
    PayableProcessor,
  ],
})
export class PayableModule {}
