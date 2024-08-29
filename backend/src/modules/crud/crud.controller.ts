/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { QueryParams } from 'src/types/query-params.type';
import { CRUDController } from './crud.interface';
import { CRUDServiceRepository } from './crud.service';

// TODO: fix architecture
// TODO: Should have a interface
@Controller()
export abstract class CrudStrategyController<T, C, U>
  implements CRUDController<T, C, U>
{
  constructor(
    private readonly baseCrudService: CRUDServiceRepository<T, C, U>,
  ) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createDto): Promise<T> {
    return await this.baseCrudService.create(createDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Quantidade de itens por página',
  })
  async findMany(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<T[]> {
    const skip = (page - 1) * limit;
    return await this.baseCrudService.findMany({ skip, take: limit });
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
    @Param('id') id: string | undefined,
    @Query() query: QueryParams<unknown>,
  ): Promise<T> {
    return query
      ? await this.baseCrudService.findOneById(id)
      : await this.baseCrudService.findOne({ id, query });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: U): Promise<T> {
    return await this.baseCrudService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<T> {
    return await this.baseCrudService.remove(id);
  }
}
