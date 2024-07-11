import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { CRUDServiceRepository } from '../crud/crud.service';
import { UserAssignorService } from './../user-payable/user-assignor.service';

@Injectable()
export class AssignorService extends CRUDServiceRepository<
  Assignor,
  Omit<Assignor, 'id'>,
  Omit<Assignor, 'id'>
> {
  private readonly refPrisma!: PrismaService;

  constructor(
    prisma: PrismaService,
    readonly userAssignorService: UserAssignorService,
  ) {
    super(prisma, 'Assignor');
    this.refPrisma = prisma;
  }

  public async create(data: Omit<Assignor, 'id'>): Promise<Assignor>;
  public async create(
    data: Omit<Assignor, 'id'>,
    user: JwtPayload,
  ): Promise<Assignor>;
  public async create(
    data: Omit<Assignor, 'id'>,
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
