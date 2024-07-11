import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CRUDServiceRepository } from '../crud/crud.service';
import { UserNoBaseModel } from './dto/user-no-base-model.dto';

@Injectable()
export class UserService extends CRUDServiceRepository<
  User,
  UserNoBaseModel,
  UserNoBaseModel
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'User');
  }
}
