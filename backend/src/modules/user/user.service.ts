import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { AbstractCrudService } from '../crud/crud.service';
import { UserNoBaseModel } from './DTO/user-no-base-model.DTO';

@Injectable()
export class UserService extends AbstractCrudService<User, UserNoBaseModel> {
  constructor(prisma: PrismaService) {
    super(prisma, 'User');
  }
}
