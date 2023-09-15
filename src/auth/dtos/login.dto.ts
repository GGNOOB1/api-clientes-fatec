import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(15)
  password: string;
}
