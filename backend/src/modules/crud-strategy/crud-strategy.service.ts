/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { QueryParams } from 'src/types/query-params';

type PrismaQuery = {
  where: Prisma.UserWhereUniqueInput | Prisma.UserWhereInput;
};

@Injectable()
export class CrudStrategyService<T, C, U> {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly model: Prisma.ModelName,
  ) {}

  private buildPrismaQuery(query: unknown) {
    return {
      where: Object.entries(query).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {}) as PrismaQuery,
    };
  }

  async create(data: C, req?): Promise<T> {
    return await this.prisma[this.model].create({ data });
  }

  async findMany({ skip = 0, take = 10 }): Promise<T[]> {
    return await this.prisma[this.model].findMany({ skip, take });
  }

  async findOne(query: QueryParams<unknown>): Promise<T> {
    return await this.prisma[this.model].findUnique(
      this.buildPrismaQuery(query),
    );
  }

  async findOneById(id: string): Promise<T> {
    return await this.prisma[this.model].findUnique({
      where: { id: id },
    });
  }

  async update(id: string, data: U): Promise<T> {
    return await this.prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<T> {
    return await this.prisma[this.model].delete({
      where: { id },
    });
  }
}
