import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  password: string;
}

export class userLoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  password: string;
}
