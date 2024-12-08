import { Module } from '@nestjs/common';
import { UserAssignorModule } from '../user-payable/user-assignor.module';
import { UserModule } from '../user/user.module';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

@Module({
  imports: [UserAssignorModule, UserModule],
  controllers: [AssignorController],
  providers: [AssignorService],
  exports: [AssignorService],
})
export class AssignorModule {}
