import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseModel } from 'src/models/baseModel.dto';

export class AssignorDto extends BaseModel {
  @IsString()
  @IsNotEmpty({ message: 'document must not be empty' })
  @ApiProperty()
  document: string;

  @IsString()
  @IsNotEmpty({ message: 'email must not be empty' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'name must not be empty' })
  @ApiProperty()
  name: string;
}
