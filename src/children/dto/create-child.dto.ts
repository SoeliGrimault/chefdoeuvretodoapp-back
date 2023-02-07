import { User } from 'src/user/entities/user.entity';

export class CreateChildDto {
  name: string;
  parentId?: string;
  userId: User;
}
