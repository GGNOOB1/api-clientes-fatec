import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import StateDto from './state.dto';
import { Type } from 'class-transformer';

export default class CityDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => StateDto)
  state: StateDto;
}
