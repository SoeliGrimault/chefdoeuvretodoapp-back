import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateEventDto {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  date: string;
  time: string;
  description: string;
  category?: Category;
  organisateur?: User;
}
