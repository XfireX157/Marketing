import { Role } from './role.enum';

export interface userEntity {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: Role;
}
