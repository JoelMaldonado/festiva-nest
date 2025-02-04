import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateRedDto {
  @IsPositive()
  @IsNumber()
  idRed: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}
