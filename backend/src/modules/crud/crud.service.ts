import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Pagination } from 'src/types/pagination.type';
import { QueryParams } from 'src/types/query-params';
import { CRUDRepository } from './crud.interface';

type PrismaQuery = {
  where: Prisma.UserWhereUniqueInput | Prisma.UserWhereInput;
};

@Injectable()
export class CRUDServiceRepository<T, C, U> implements CRUDRepository<T, C, U> {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly model: Prisma.ModelName,
  ) {}

  public async create(data: C): Promise<T> {
    return await this.prisma[this.model].create({ data });
  }

  public async findMany({ skip = 0, take = 10 }: Pagination): Promise<T[]> {
    return await this.prisma[this.model].findMany({ skip, take });
  }

  public async findOne(query: QueryParams<unknown>): Promise<T> {
    return await this.prisma[this.model].findUnique(query);
  }

  public async findOneById(id: string): Promise<T> {
    return await this.prisma[this.model].findUnique({
      where: { id: id },
    });
  }

  public async update(id: string, data: U): Promise<T> {
    return await this.prisma[this.model].update({
      where: { id },
      data,
    });
  }

  public async remove(id: string): Promise<T> {
    return await this.prisma[this.model].delete({
      where: { id },
    });
  }

  private buildPrismaQuery(query: unknown) {
    return {
      where: Object.entries(query).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {}) as PrismaQuery,
    };
  }
}
