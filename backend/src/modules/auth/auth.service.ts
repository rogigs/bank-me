import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNoBaseModel } from '../user/DTO/user-no-base-model.DTO';
import { UserService } from '../user/user.service';
import { AuthResponse } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: UserNoBaseModel): Promise<Error | AuthResponse> {
    const user = await this.userService.findOne({
      where: { email: data.email },
    });

    if (user instanceof Error) return user;

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
