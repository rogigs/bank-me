import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.type';
import { CRUDServiceRepository } from '../crud/crud.service';
import { UserAssignorService } from './../user-payable/user-assignor.service';
import { AssignorNoBaseModel } from './dto/assignor-no-base-model.dto';

@Injectable()
export class AssignorService extends CRUDServiceRepository<
  Assignor,
  AssignorNoBaseModel,
  AssignorNoBaseModel
> {
  constructor(
    prisma: PrismaService,
    private readonly userAssignorService: UserAssignorService,
  ) {
    super(prisma, 'Assignor');
  }

  async create(data: AssignorNoBaseModel): Promise<Assignor>;
  async create(
    data: AssignorNoBaseModel,
    user: Request & JwtPayload,
  ): Promise<Assignor>;

  async create(
    data: AssignorNoBaseModel,
    user?: Request & JwtPayload,
  ): Promise<Assignor> {
    const assignor = await super.create(data);

    if (user) {
      await this.userAssignorService.create({
        assignorId: assignor.id,
        userId: user.id,
      });
    }

    return assignor;
  }
}
