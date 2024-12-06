import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { QueryParams } from 'src/types/query-params.type';
import { AuthGuard } from '../auth/auth.guard';
import { AbstractCrudController } from '../crud/crud.controller';
import {
  UserNoBaseModel,
  UserNoBaseModelDTO,
} from './DTO/user-no-base-model.DTO';
import { UserInterceptor } from './user.interceptors';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'user', version: '1' })
@UseInterceptors(UserInterceptor)
export class UserController extends AbstractCrudController<
  User,
  UserNoBaseModel
> {
  constructor(public readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiBody({ type: UserNoBaseModelDTO })
  @HttpCode(201)
  async create(@Body() createDTO: UserNoBaseModel): Promise<void> {
    await super.create({
      ...createDTO,
      password: await bcrypt.hash(createDTO.password, await bcrypt.genSalt()),
    });
  }

  @Patch(':id')
  @ApiBody({ type: UserNoBaseModelDTO })
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDTO: UserNoBaseModel,
  ): Promise<User> {
    return await super.update(id, updateDTO);
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
  @UseGuards(AuthGuard)
  async findMany(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<User[]> {
    return await super.findMany(page, limit);
  }

  @UseGuards(AuthGuard)
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
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: QueryParams<unknown>,
  ): Promise<User> {
    return await super.findOne(id, query);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await super.remove(id);
  }
}
