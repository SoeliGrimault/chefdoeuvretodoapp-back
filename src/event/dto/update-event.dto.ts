import { Matches, IsOptional } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class UpdateEventDto {
  @IsOptional()
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'Le titre doit commencer par une lettre',
  })
  name: string;

  address: string;

  @IsOptional()
  @Matches(/^[0-9]{5}$/, {
    message: 'Le code postal français doit faire 5 chiffres',
  })
  postalCode: string;

  city: string;

  @IsOptional()
  @Matches(/^(202[3-9])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'La date doit être au format 2023-01-01',
  })
  date: string;

  time: string;

  @IsOptional()
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'La description doit commencer par une lettre',
  })
  description: string;

  category?: Category;
}
