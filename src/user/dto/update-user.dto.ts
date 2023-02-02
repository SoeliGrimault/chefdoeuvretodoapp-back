import { RoleEnumType } from '../entities/user.entity';

export class UpdateUserDto {
  email: string;
  password: string;
  name: string;
  picture: string;
  role: RoleEnumType;
}
