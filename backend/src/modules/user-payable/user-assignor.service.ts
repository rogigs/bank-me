import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from './../../config/prisma.service';
import { UserAssignorDto } from './dto/user-assignor.dto';

@UseGuards(AuthGuard)
@Injectable()
export class UserAssignorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserAssignorDto) {
    return await this.prisma.userAssignor.create({ data });
  }
}
