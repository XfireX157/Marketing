import { OmitType } from '@nestjs/mapped-types';
import { userDto } from './user.dto';

export class userLoginDto extends OmitType(userDto, [
  'role',
  'name',
  'id',
] as const) {}
