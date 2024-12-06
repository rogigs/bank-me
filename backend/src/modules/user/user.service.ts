import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CRUDServiceRepository } from '../crud/crud.service';
import { UserNoBaseModel } from './DTO/user-no-base-model.DTO';

@Injectable()
export class UserService extends CRUDServiceRepository<User, UserNoBaseModel> {
  constructor(prisma: PrismaService) {
    super(prisma, 'User');
  }
}
