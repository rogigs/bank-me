import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from 'src/models/baseModel.DTO';

export class UserDTO extends BaseModel {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'email must not be empty' })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password must not be empty' })
  @ApiProperty()
  password: string;
}
