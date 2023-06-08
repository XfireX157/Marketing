import { Role } from './role.enum';

export class userEntity {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: Role;
}
