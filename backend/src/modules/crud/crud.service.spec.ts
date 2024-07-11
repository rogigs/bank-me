import { Test, TestingModule } from '@nestjs/testing';
import { CRUDServiceRepository } from './crud.service';

describe('CRUDService', () => {
  let service: CRUDServiceRepository<any, any, any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CRUDServiceRepository],
    }).compile();

    service = module.get<CRUDServiceRepository<any, any, any>>(
      CRUDServiceRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
