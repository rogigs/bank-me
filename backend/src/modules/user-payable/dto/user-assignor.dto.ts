import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserAssignorDTO {
  @IsString()
  @IsNotEmpty({ message: 'userId must not be empty' })
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'assignorId must not be empty' })
  @ApiProperty()
  assignorId: string;
}
