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
  private readonly refPrisma!: PrismaService;

  constructor(
    prisma: PrismaService,
    readonly userAssignorService: UserAssignorService,
  ) {
    super(prisma, 'Assignor');
    this.refPrisma = prisma;
  }

  public async create(data: AssignorNoBaseModel): Promise<Assignor>;
  public async create(
    data: AssignorNoBaseModel,
    user: JwtPayload,
  ): Promise<Assignor>;
  public async create(
    data: AssignorNoBaseModel,
    user?: JwtPayload,
  ): Promise<Assignor> {
    const assignor = await this.refPrisma.assignor.create({
      data,
    });

    if (user) {
      await this.userAssignorService.create({
        assignorId: assignor.id,
        userId: user.id,
      });
    }

    return assignor;
  }
}
