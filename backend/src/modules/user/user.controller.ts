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
import { CrudStrategyController } from '../crud/crud.controller';
import {
  UserNoBaseModel,
  UserNoBaseModelDto,
} from './dto/user-no-base-model.dto';
import { UserInterceptor } from './user.interceptors';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'user', version: '1' })
@UseInterceptors(UserInterceptor)
export class UserController extends CrudStrategyController<
  User,
  UserNoBaseModel,
  UserNoBaseModel
> {
  constructor(public readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiBody({ type: UserNoBaseModelDto })
  @HttpCode(201)
  async create(@Body() createDto: UserNoBaseModel): Promise<void> {
    await super.create({
      ...createDto,
      password: await bcrypt.hash(createDto.password, await bcrypt.genSalt()),
    });
  }

  @Patch(':id')
  @ApiBody({ type: UserNoBaseModelDto })
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserNoBaseModel,
  ): Promise<User> {
    return await super.update(id, updateDto);
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
