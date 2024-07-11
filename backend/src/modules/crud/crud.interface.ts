import { Pagination } from 'src/types/pagination.type';
import { QueryParams } from 'src/types/query-params';

export interface CRUDRepository<T, C, U> {
  create(data: C): Promise<T>;
  findMany(params: Pagination): Promise<T[]>;
  findOne(query: QueryParams<unknown>): Promise<T | null>;
  findOneById(id: string): Promise<T | null>;
  update(id: string, data: U): Promise<T>;
  remove(id: string): Promise<T>;
}
