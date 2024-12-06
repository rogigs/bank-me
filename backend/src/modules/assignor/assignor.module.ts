import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UserAssignorModule } from '../user-payable/user-assignor.module';
import { UserService } from '../user/user.service';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

@Module({
  imports: [UserAssignorModule],
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService, UserService],
  exports: [AssignorService],
})
export class AssignorModule {}
