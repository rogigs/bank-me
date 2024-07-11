import { Module } from '@nestjs/common';
import { CrudStrategyController } from './crud.controller';
import { CRUDServiceRepository } from './crud.service';

@Module({
  controllers: [CrudStrategyController],
  providers: [CRUDServiceRepository],
})
export class CrudStrategyModule {}
