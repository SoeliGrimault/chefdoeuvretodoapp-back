import { Category } from 'src/category/entities/category.entity';
import { Child } from 'src/children/entities/child.entity';

export class UpdateEventDto {
  name: string;
  address?: string;
  postalCode?: string;
  city?: string;
  date: string;
  time: string;
  description?: string;
  category?: Category;
  participants?: Child[];
}
