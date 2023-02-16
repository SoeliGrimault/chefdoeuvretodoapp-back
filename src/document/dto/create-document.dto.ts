import { Matches, IsOptional } from 'class-validator';

import { Category } from 'src/category/entities/category.entity';
import { Child } from 'src/children/entities/child.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateDocumentDto {
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'Le titre doit commencer par une lettre',
  })
  name: string;
  picture: string;
  category: Category;
  user: User;
  @IsOptional()
  children: Child[];
  // la je met children ou pas?
}
