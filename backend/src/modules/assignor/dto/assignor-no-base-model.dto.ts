import { OmitType } from '@nestjs/swagger';
import { AssignorDTO } from './assignor.DTO';

export class AssignorNoBaseModelDTO extends OmitType(AssignorDTO, [
  'id',
] as const) {}

export type AssignorNoBaseModel = Omit<AssignorDTO, 'id'>;
