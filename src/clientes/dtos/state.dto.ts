import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class StateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @IsNotEmpty()
  name: string;
}
