import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @IsString()
  @IsNotEmpty({ message: 'message must not be empty' })
  @ApiProperty()
  message: string;

  @IsString()
  @IsNotEmpty({ message: 'email must not be empty' })
  @IsEmail()
  @ApiProperty()
  to: string;

  @IsString()
  @IsNotEmpty({ message: 'subject must not be empty' })
  @ApiProperty()
  subject: string;
}
