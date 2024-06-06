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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '../auth/auth.guard';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
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
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiBody({ type: UserNoBaseModelDto })
  @HttpCode(201)
  async create(@Body() createDto: UserNoBaseModel): Promise<User> {
    return await this.userService.create({
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
    return await this.userService.update(id, updateDto);
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
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<User[]> {
    const skip = (page - 1) * limit;
    return await this.userService.findMany({ skip, take: limit });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.remove(id);
  }
}
