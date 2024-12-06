import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Assignor } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { CrudStrategyController } from '../crud/crud.controller';
import { AssignorService } from './assignor.service';
import { AssignorNoBaseModel } from './dto/assignor-no-base-model.dto';

@UseGuards(AuthGuard)
@ApiTags('Assignor')
@ApiBearerAuth()
@Controller({ path: 'integrations/assignor', version: '1' })
export class AssignorController extends CrudStrategyController<
  Assignor,
  AssignorNoBaseModel,
  AssignorNoBaseModel
> {
  constructor(public readonly assignorService: AssignorService) {
    super(assignorService);
  }
}
