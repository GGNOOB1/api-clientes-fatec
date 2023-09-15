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
} from 'class-validator';
import { CpfCnpjValidator } from '../validators/cpfValidator';
import { Type } from 'class-transformer';
import StatusCustomer from '../enums/statusCustomer';
import GenderCustomer from '../enums/genderCustomer';
import CityDto from './city.dto';

export default class UpdateCustomerDto {
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  address: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @IsOptional()
  @IsString()
  @Length(1)
  @IsEnum(StatusCustomer)
  @IsNotEmpty()
  status: StatusCustomer;

  @IsOptional()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  confirmPassword: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(GenderCustomer)
  @Length(1)
  gender: GenderCustomer;

  @IsOptional()
  @ValidateNested()
  @Type(() => CityDto)
  city: CityDto;

  imgpath: string;
}
