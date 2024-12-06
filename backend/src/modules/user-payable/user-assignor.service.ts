import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from './../../config/prisma.service';
import { UserAssignorDTO } from './DTO/user-assignor.DTO';

@UseGuards(AuthGuard)
@Injectable()
export class UserAssignorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserAssignorDTO) {
    return await this.prisma.userAssignor.create({ data });
  }
}
