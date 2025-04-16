import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  idArtistType: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  biography: string;

  @IsString()
  @IsOptional()
  profileUrl: string;
}
