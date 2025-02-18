import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PositiveNumberPipe } from 'src/pipes/PositiveNumberPipe.pipe';
import { QueryParams } from 'src/types/query-params.type';
import { CRUDController } from './crud.interface';
import { AbstractCrudService } from './crud.service';

@Controller()
export abstract class AbstractCrudController<T, C>
  implements CRUDController<T, C>
{
  constructor(private readonly baseCrudService: AbstractCrudService<T, C>) {}

  public validateResult(result: T | T[] | Error | null): T | T[] {
    if (result instanceof Error) {
      throw new BadRequestException(
        'An error occurred while processing the request:' + result.message,
      );
    }

    if (result === null || result === undefined) {
      throw new NotFoundException('Resource not found');
    }

    return result;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createDTO: C): Promise<T> {
    const result = await this.baseCrudService.create(createDTO);
    return this.validateResult(result) as T;
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'take',
    required: true,
    type: Number,
    description: 'Quantidade de itens por página',
  })
  async findMany(
    @Query('page', PositiveNumberPipe) page = 1,
    @Query('take', PositiveNumberPipe) take = 10,
  ): Promise<T[]> {
    const pagination = { skip: (page - 1) * take, take };

    const result = await this.baseCrudService.findMany(pagination);
    return this.validateResult(result) as T[];
  }

  @ApiQuery({
    name: 'query',
    required: false,
    description:
      'Parâmetros de consulta dinâmicos (enviar como um objeto JSON)',
    schema: {
      type: 'object',
    },
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() query?: QueryParams<unknown>,
  ): Promise<T> {
    const result = query
      ? await this.baseCrudService.findOneById(id)
      : await this.baseCrudService.findOne({ id, query });

    return this.validateResult(result) as T;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDTO: C): Promise<T> {
    const result = await this.baseCrudService.update(id, updateDTO);
    return this.validateResult(result) as T;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseCrudService.remove(id);
    this.validateResult(result);
  }
}
