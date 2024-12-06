import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  UserNoBaseModel,
  UserNoBaseModelDTO,
} from '../user/DTO/user-no-base-model.DTO';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller({ path: '/integrations/auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: UserNoBaseModelDTO })
  signIn(@Body() signInDTO: UserNoBaseModel) {
    return this.authService.signIn(signInDTO);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user')
  getProfile(@Req() req: Request) {
    console.log('🚀 ~ AuthController ~ getProfile ~ req:', req);
  }
}
