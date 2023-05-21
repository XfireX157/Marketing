import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Role } from 'src/Entity/role.enum';

export class userDto {
  id?: string;

  @IsString({ each: true })
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)
  password: string;

  @IsEnum(Role)
  role?: Role;
}

export class userLoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  password: string;
}
