import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CRUDServiceRepository } from '../crud/crud.service';
import { UserService } from '../user/user.service';
import { UserAssignorService } from './../user-payable/user-assignor.service';
import { AssignorNoBaseModel } from './DTO/assignor-no-base-model.DTO';

@Injectable()
export class AssignorService extends CRUDServiceRepository<
  Assignor,
  AssignorNoBaseModel
> {
  constructor(
    prisma: PrismaService,
    private readonly userAssignorService: UserAssignorService,
    private readonly userService: UserService,
  ) {
    super(prisma, 'Assignor');
  }

  async create(data: AssignorNoBaseModel): Promise<Assignor | Error> {
    const assignor = await super.create(data);

    if (assignor instanceof Error) return assignor;

    const user = await this.userService.findOne({
      where: { email: assignor.email },
    });

    if (user instanceof Error) return user;

    await this.userAssignorService.create({
      assignorId: assignor.id,
      userId: user.id,
    });

    return assignor;
  }
}
