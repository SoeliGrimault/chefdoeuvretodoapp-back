import { IsEmail, IsOptional, Matches, MinLength } from 'class-validator';
import { RoleEnumType } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: "le format de l'email est invalide" })
  @Matches(/^((?!yopmail\.com).)*$/, {
    message: 'Un vrai mail svp!',
  })
  email?: string;

  // @IsOptional()
  // @MinLength(8, {
  //   message: 'Le mot de passe doit faire au moins 8 caractères',
  // })
  // @Matches(
  //   /^(?=.*[0-9])(?=.*[!@#\$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).+$/,
  //   { message: 'Format du mot de passe invalide' },
  // )
  // password?: string;

  @IsOptional()
  @MinLength(2, {
    message: 'Votre nom doit faire au moins 2 caractères, merci',
  })
  @Matches(/^[a-zA-ZÀ-ÿ]+.*[a-zA-ZÀ-ÿ0-9]$/, {
    message: 'Le nom doit forcément commencer et terminer par une lettre',
  })
  name: string;

  picture: string;
}
