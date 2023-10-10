import {
  IsString,
  IsNotEmpty,
  Validate,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsEmail,
  Length,
  IsDateString,
  IsNumber,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

import StatusCustomer from '../enums/statusCustomer';
import GenderCustomer from '../enums/genderCustomer';

import { RgValidator } from '../validators/rgValidator';

export default class CreateCustomerDto {
  id: number;

  // @IsString()
  // @Validate(CpfCnpjValidator)
  // @IsNotEmpty()
  // @MinLength(11)
  // @MaxLength(14)
  // cpfCnpj: string;

  @IsString()
  @Validate(RgValidator)
  @IsNotEmpty()
  identify_document: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @MinLength(1)
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(GenderCustomer)
  @Length(1)
  gender: GenderCustomer;

  image_path: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  cep: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  complement: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  reference: string;
}
