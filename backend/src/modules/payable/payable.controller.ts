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
  PayableNoBaseModelDto,
} from './dto/payable-no-base-model.dto';
import { PayableService } from './payable.service';

@ApiTags('Payable')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ path: 'integrations/payable', version: '1' })
export class PayableController extends CrudStrategyController<
  Payable,
  PayableNoBaseModel,
  PayableNoBaseModel
> {
  constructor(public readonly payableService: PayableService) {
    super(payableService);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: PayableNoBaseModelDto,
  })
  @Post()
  async create(@Body() createDto: PayableNoBaseModel): Promise<void> {
    await this.payableService.create(createDto);
  }

  @Post('/batch')
  @ApiBody({ type: PayableNoBaseModelDto })
  @HttpCode(HttpStatus.CREATED)
  async createMany(
    @Body() createDto: PayableNoBaseModel[],
    @Req() req: Request,
  ): Promise<Bull.Job<string | null> | string> {
    const longProcess = createDto.length > 10;
    this.payableService.createMany(createDto, req.user, longProcess);

    if (longProcess) return 'It will be send a email notification';
  }
}
