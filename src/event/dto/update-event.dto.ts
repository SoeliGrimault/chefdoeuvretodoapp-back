import { Category } from 'src/category/entities/category.entity';

export class UpdateEventDto {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  date: string;
  time: string;
  description: string;
  category?: Category;
}
