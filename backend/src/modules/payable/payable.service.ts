import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import Bull, { Queue } from 'bull';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.type';
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
    @InjectQueue('payable') private readonly queue: Queue,
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

  async create(data: PayableNoBaseModel): Promise<Payable | Error> {
    await this.assignorService.findOneById(data.assignorId);

    console.log(
      '🚀 ~ create ~ await super.create(data):',
      await super.create(data),
    );

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
