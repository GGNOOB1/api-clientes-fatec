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
} from 'class-validator';
import { CpfCnpjValidator } from '../validators/cpfValidator';
import { Type } from 'class-transformer';
import StatusCustomer from '../enums/statusCustomer';
import GenderCustomer from '../enums/genderCustomer';
import CityDto from './city.dto';

export default class CreateCustomerDto {
  id: number;

  // @IsString()
  // @Validate(CpfCnpjValidator)
  // @IsNotEmpty()
  // @MinLength(11)
  // @MaxLength(14)
  // cpfCnpj: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  address: string;

  @MinLength(1)
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @Length(1)
  @IsEnum(StatusCustomer)
  @IsNotEmpty()
  status: StatusCustomer;

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

  @ValidateNested()
  @Type(() => CityDto)
  city: CityDto;

  imgpath: string;
}
