import { Module } from '@nestjs/common';
import { UserAssignorService } from './user-assignor.service';

@Module({
  providers: [UserAssignorService],
  exports: [UserAssignorService],
})
export class UserAssignorModule {}
