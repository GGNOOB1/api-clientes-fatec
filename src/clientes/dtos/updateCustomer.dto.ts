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
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsString()
  @Validate(RgValidator)
  @IsNotEmpty()
  @IsOptional()
  identify_document: number;

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
  @IsNumber()
  @Min(0)
  @Max(1)
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
  @IsNotEmpty()
  @IsString()
  @IsEnum(GenderCustomer)
  @Length(1)
  gender: GenderCustomer;

  @IsOptional()
  @ValidateNested()
  @Type(() => CityDto)
  city: CityDto;

  @IsString()
  @IsOptional()
  image_path: string;
}
