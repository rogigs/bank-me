import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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

  // TODO: resolve @ApiBody to show generic types
  // Generics are a compile-time concept, meaning they are resolved during the compilation
  // of TypeScript code and do not exist natively at runtime.
  // Swagger, on the other hand, operates with the description of APIs at runtime and does
  // not have direct access to generic type information. It does not understand how generic
  // types should be translated into the OpenAPI specification (which is the standard for Swagger).
  @ApiBody({
    type: AssignorNoBaseModelDTO,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDTO: AssignorNoBaseModel,
  ): Promise<Assignor> {
    return super.update(id, updateDTO);
  }
}
