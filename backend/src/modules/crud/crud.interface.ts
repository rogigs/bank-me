import { Pagination } from 'src/types/pagination.type';
import { QueryParams } from 'src/types/query-params.type';

export interface CRUDRepository<T, C> {
  create(data: C): Promise<T | Error>;
  findMany(params: Pagination): Promise<T[] | Error>;
  findOne(query: QueryParams<unknown>): Promise<T | null | Error>;
  findOneById(id: string): Promise<T | null | Error>;
  update(id: string, data: C): Promise<T | Error>;
  remove(id: string): Promise<T | Error>;
}

export interface CRUDController<T, C> {
  create(data: C): Promise<void>;
  findMany(page: number, limit: number): Promise<T[]>;
  findOne(id: string, query: QueryParams<unknown>): Promise<T>;
  update(id: string, data: C): Promise<T>;
  remove(id: string): Promise<void>;
}
