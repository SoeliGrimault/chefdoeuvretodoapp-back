import { Matches } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateChildDto {
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'Le nom doit commencer par une lettre',
  })
  name: string;
  parent: User;
}
