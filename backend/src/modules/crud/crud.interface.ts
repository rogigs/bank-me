import { JwtPayload } from 'src/types/jwt-payload.type';
import { Pagination } from 'src/types/pagination.type';
import { QueryParams } from 'src/types/query-params.type';

export interface CRUDRepository<T, C, U> {
  create(data: C): Promise<T>;
  create(data: C, user: Request & JwtPayload): Promise<T>;
  findMany(params: Pagination): Promise<T[]>;
  findOne(query: QueryParams<unknown>): Promise<T | null>;
  findOneById(id: string): Promise<T | null>;
  update(id: string, data: U): Promise<T>;
  remove(id: string): Promise<T>;
}

export interface CRUDController<T, C, U> {
  create(data: C): Promise<T>;
  create(data: C, user: Request & JwtPayload): Promise<T>;
  findMany(page: number, limit: number): Promise<T[]>;
  findOne(id: string, query: QueryParams<unknown>): Promise<T | null>;
  update(id: string, data: U): Promise<T>;
  remove(id: string): Promise<T>;
}
