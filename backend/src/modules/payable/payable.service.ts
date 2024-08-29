import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import Bull, { Queue } from 'bull';
import { PrismaService } from 'src/config/prisma.service';
import { CRUDServiceRepository } from '../crud/crud.service';
import { AssignorService } from './../assignor/assignor.service';
import { PayableNoBaseModel } from './dto/payable-no-base-model.dto';
import { PayableDto } from './dto/payable.dto';

@Injectable()
export class PayableService extends CRUDServiceRepository<
  Payable,
  PayableNoBaseModel,
  PayableNoBaseModel
> {
  private result: Payable | null = null;

  constructor(
    @InjectQueue('payable') private queue: Queue,
    private readonly assignorService: AssignorService,
    prisma: PrismaService,
  ) {
    super(prisma, 'Payable');
  }

  setResult(result: Payable): void {
    this.result = result;
  }

  getResult(): PayableDto | null {
    return this.result;
  }

  async create(data: PayableNoBaseModel): Promise<Payable> {
    await this.assignorService.findOneById(data.assignorId);

    return super.create(data);
  }

  async createMany(
    data: PayableNoBaseModel[],
    user?: string,
  ): Promise<Bull.Job<string | null>> {
    return this.queue.add('createPayable', {
      data,
      user,
    });
  }
}
