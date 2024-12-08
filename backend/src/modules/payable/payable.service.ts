import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import Bull, { Queue } from 'bull';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.type';
import { AbstractCrudService } from '../crud/crud.service';
import { AssignorService } from './../assignor/assignor.service';
import { PayableNoBaseModel } from './DTO/payable-no-base-model.DTO';
import { PayableDTO } from './DTO/payable.DTO';

@Injectable()
export class PayableService extends AbstractCrudService<
  Payable,
  PayableNoBaseModel
> {
  private result: Payable | null = null;

  constructor(
    @InjectQueue('payable') private readonly queue: Queue,
    private readonly assignorService: AssignorService,
    prisma: PrismaService,
  ) {
    super(prisma, 'Payable');
  }

  setResult(result: Payable): void {
    this.result = result;
  }

  getResult(): PayableDTO | null {
    return this.result;
  }

  async create(data: PayableNoBaseModel): Promise<Payable | Error> {
    await this.assignorService.findOneById(data.assignorId);

    return await super.create(data);
  }

  createMany(
    data: PayableNoBaseModel[],
    user: JwtPayload,
    longProcess: boolean,
  ): Promise<Bull.Job<string | null>> {
    return this.queue.add('createPayable', {
      data,
      user,
      longProcess,
    });
  }
}
