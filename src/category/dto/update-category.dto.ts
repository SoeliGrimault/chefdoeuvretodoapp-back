import { Matches } from 'class-validator';

export class UpdateCategoryDto {
  @Matches(/^[a-zA-ZÀ-ÿ]+.*$/, {
    message: 'Le nom doit commencer par une lettre',
  })
  name: string;
}
