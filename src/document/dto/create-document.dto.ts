import { Matches } from 'class-validator';

import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateDocumentDto {
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'Le titre doit commencer par une lettre',
  })
  name: string;
  picture: string;
  category?: Category;
  user?: User;
}
