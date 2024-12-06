import { OmitType } from '@nestjs/swagger';
import { UserDTO } from './user.DTO';

export class UserNoBaseModelDTO extends OmitType(UserDTO, ['id'] as const) {}

export type UserNoBaseModel = Omit<UserDTO, 'id'>;
