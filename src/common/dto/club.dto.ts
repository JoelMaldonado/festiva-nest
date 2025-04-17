import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClubDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  logoUrl: string;
}
