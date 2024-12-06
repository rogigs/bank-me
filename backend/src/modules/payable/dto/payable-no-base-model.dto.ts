import { OmitType } from '@nestjs/swagger';
import { PayableDTO } from './payable.DTO';

export class PayableNoBaseModelDTO extends OmitType(PayableDTO, [
  'id',
] as const) {}

export type PayableNoBaseModel = Omit<PayableDTO, 'id'>;
