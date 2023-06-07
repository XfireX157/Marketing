import { OmitType } from '@nestjs/mapped-types';
import { userRegisterDto } from './userRegister.dto';

export class userLoginDto extends OmitType(userRegisterDto, [
  'role',
  'name',
  'id',
] as const) {}
