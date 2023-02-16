import { Matches, IsOptional } from 'class-validator';

import { Category } from 'src/category/entities/category.entity';
import { Child } from 'src/children/entities/child.entity';

export class UpdateDocumentDto {
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'Le titre doit commencer par une lettre',
  })
  @IsOptional()
  name: string;
  @IsOptional()
  picture: string;
  @IsOptional()
  category: Category;
  @IsOptional()
  children?: Child[];
}
