import { Test, TestingModule } from '@nestjs/testing';
import { AbstractCrudService } from './crud.service';

describe('CRUDService', () => {
  let service: AbstractCrudService<any, any, any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbstractCrudService],
    }).compile();

    service =
      module.get<AbstractCrudService<any, any, any>>(AbstractCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
