import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export default class CreateAddressDto {
  id: number;

  @IsString()
  @Length(9)
  @IsNotEmpty()
  cep: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  number: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  complement: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  reference: string;
}
