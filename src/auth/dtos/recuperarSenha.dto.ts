import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class RecuperarSenha {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  email: string;
}
