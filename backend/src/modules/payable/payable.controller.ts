import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Payable } from '@prisma/client';
import Bull from 'bull';
import { Request } from 'src/types/request.type';
import { AuthGuard } from '../auth/auth.guard';
import { CrudStrategyController } from '../crud/crud.controller';
import {
  PayableNoBaseModel,
  PayableNoBaseModelDTO,
} from './DTO/payable-no-base-model.DTO';
import { PayableService } from './payable.service';

@ApiTags('Payable')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ path: 'integrations/payable', version: '1' })
export class PayableController extends CrudStrategyController<
  Payable,
  PayableNoBaseModel
> {
  constructor(public readonly payableService: PayableService) {
    super(payableService);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: PayableNoBaseModelDTO,
  })
  @Post()
  async create(@Body() createDTO: PayableNoBaseModel): Promise<void> {
    await this.payableService.create(createDTO);
  }

  @Post('/batch')
  @ApiBody({ type: PayableNoBaseModelDTO })
  @HttpCode(HttpStatus.CREATED)
  async createMany(
    @Body() createDTO: PayableNoBaseModel[],
    @Req() req: Request,
  ): Promise<Bull.Job<string | null> | string> {
    const longProcess = createDTO.length > 10;
    this.payableService.createMany(createDTO, req.user, longProcess);

    if (longProcess) return 'It will be send a email notification';
  }
}
