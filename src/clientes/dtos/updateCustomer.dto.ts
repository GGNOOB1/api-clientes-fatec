import {
  IsString,
  IsNotEmpty,
  Validate,
  MinLength,
  MaxLength,
  IsPostalCode,
  IsPhoneNumber,
  IsEmail,
  Length,
  IsDate,
  IsObject,
  IsDateString,
  IsNumber,
  IsNumberString,
  ValidateNested,
  IsNotEmptyObject,
  IsDefined,
  IsEnum,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { CpfCnpjValidator } from '../validators/cpfValidator';
import { Type } from 'class-transformer';
import StatusCustomer from '../enums/statusCustomer';
import GenderCustomer from '../enums/genderCustomer';
import CityDto from './city.dto';
import { RgValidator } from '../validators/rgValidator';

export default class UpdateCustomerDto {
  id: number;

  // @IsString()
  // @Validate(CpfCnpjValidator)
  // @IsNotEmpty()
  // @MinLength(11)
  // @MaxLength(14)
  // cpfCnpj: string;

  @IsString()
  @Validate(RgValidator)
  @IsOptional()
  identify_document: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @MinLength(1)
  @MaxLength(200)
  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  phone: string;

  @IsDateString()
  @IsOptional()
  birthdate: Date;

  @IsEmail()
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @IsEnum(GenderCustomer)
  @Length(1)
  gender: GenderCustomer;

  image_path: string;

  @IsOptional()
  @IsString()
  @Length(9)
  cep: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  number: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  complement: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  reference: string;
}
