import { userRegisterDto } from './userRegister.dto';
import { PickType } from '@nestjs/swagger';

export class userLoginDto extends PickType(userRegisterDto, [
  'email',
  'password',
] as const) {}
