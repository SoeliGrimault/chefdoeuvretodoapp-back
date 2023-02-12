import { Matches } from 'class-validator';

import { Category } from 'src/category/entities/category.entity';

export class UpdateDocumentDto {
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'Le titre doit commencer par une lettre',
  })
  name: string;
  picture: string;
  category?: Category;
}
