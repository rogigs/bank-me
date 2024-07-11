import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNoBaseModel } from '../user/dto/user-no-base-model.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: UserNoBaseModel): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({
      where: { email: data.email },
    });

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
