import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Pagination } from 'src/types/pagination.type';
import { QueryParams } from 'src/types/query-params.type';
import { CRUDRepository } from './crud.interface';

@Injectable()
export abstract class AbstractCrudService<T, C>
  implements CRUDRepository<T, C>
{
  constructor(
    private readonly prisma: PrismaClient,
    private readonly model: Prisma.ModelName,
  ) {}

  public async create(data: C): Promise<T | Error> {
    try {
      return await this.prisma[this.model].create({ data });
    } catch (error) {
      console.error('Error in create method:', error);
      return new Error(
        `Operation create failed. Error: ${error.message || 'Unknown error.'}`,
      );
    }
  }

  public async findMany({
    skip = 0,
    take = 10,
  }: Pagination): Promise<T[] | Error> {
    try {
      return await this.prisma[this.model].findMany({ skip, take });
    } catch (error) {
      console.error('Error in findMany method:', error);
      return new Error(
        `Operation findMany failed. Error: ${error.message || 'Unknown error.'}`,
      );
    }
  }

  public async findOne(query: QueryParams<unknown>): Promise<T | null | Error> {
    try {
      if (!query) throw new Error('Query parameters are missing.');

      return await this.prisma[this.model].findUnique(query);
    } catch (error) {
      console.error('Error in findOne method:', error);
      return new Error(
        `Operation findOne failed. Error: ${error.message || 'Unknown error.'}`,
      );
    }
  }

  public async findOneById(id: string): Promise<T | null | Error> {
    try {
      if (!id) throw new Error('ID is required.');

      return await this.prisma[this.model].findUnique({ where: { id } });
    } catch (error) {
      console.error('Error in findOneById method:', error);
      return new Error(
        `Operation findOneById failed. Error: ${error.message || 'Unknown error.'}`,
      );
    }
  }

  public async update(id: string, data: C): Promise<T | Error> {
    try {
      if (!id || !data) throw new Error('ID or data is missing for update.');

      return await this.prisma[this.model].update({ where: { id }, data });
    } catch (error) {
      console.error('Error in update method:', error);
      return new Error(
        `Operation update failed. Error: ${error.message || 'Unknown error.'}`,
      );
    }
  }

  public async remove(id: string): Promise<T | Error> {
    try {
      if (!id) throw new Error('ID is required for deletion.');

      return await this.prisma[this.model].delete({ where: { id } });
    } catch (error) {
      console.error('Error in remove method:', error);
      return new Error(
        `Operation remove failed. Error: ${error.message || 'Unknown error.'}`,
      );
    }
  }
}
