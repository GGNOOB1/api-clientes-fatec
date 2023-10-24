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

  @IsEmail()
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  email: string;
}
