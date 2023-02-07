import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateDocumentDto {
  name: string;
  picture: string;
  category?: Category;
  user?: User;
}
