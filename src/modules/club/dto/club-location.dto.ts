import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ClubLocationDto {
  @IsString()
  address: string;

  @IsNumber()
  @IsOptional()
  latitude: number;

  @IsNumber()
  @IsOptional()
  longitude: number;

  @IsString()
  @IsOptional()
  mapsUrl: string;
}
