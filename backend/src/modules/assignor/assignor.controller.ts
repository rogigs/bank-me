import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Assignor } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { AbstractCrudController } from '../crud/crud.controller';
import { AssignorService } from './assignor.service';
import {
  AssignorNoBaseModel,
  AssignorNoBaseModelDTO,
} from './DTO/assignor-no-base-model.DTO';

@UseGuards(AuthGuard)
@ApiTags('Assignor')
@ApiBearerAuth()
@Controller({ path: 'integrations/assignor', version: '1' })
export class AssignorController extends AbstractCrudController<
  Assignor,
  AssignorNoBaseModel
> {
  constructor(public readonly assignorService: AssignorService) {
    super(assignorService);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: AssignorNoBaseModelDTO,
  })
  @Post()
  async create(@Body() createDTO: AssignorNoBaseModel): Promise<void> {
    await this.assignorService.create(createDTO);
  }
}
