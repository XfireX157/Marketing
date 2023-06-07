import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class PasswordResetToken {
  @ApiProperty()
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  @ApiProperty()
  token: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  @ApiProperty()
  email: string;

  @IsDate()
  @ApiProperty()
  tokenExpire: Date;
}
