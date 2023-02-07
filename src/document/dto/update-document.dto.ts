import { Category } from 'src/category/entities/category.entity';

export class UpdateDocumentDto {
  name: string;
  picture: string;
  category?: Category;
}
