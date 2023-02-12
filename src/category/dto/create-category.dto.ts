import { Matches } from 'class-validator';

export class CreateCategoryDto {
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'La category doit commencer par une lettre',
  })
  name: string;
}
