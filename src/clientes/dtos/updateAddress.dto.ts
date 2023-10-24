import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsOptional,
} from 'class-validator';

export default class UpdateAddressDto {
  id: number;

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
