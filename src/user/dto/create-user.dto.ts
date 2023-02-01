import { RoleEnumType } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  picture: string;
  role: RoleEnumType;
}
