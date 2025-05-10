import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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

export class ClubSocialNetworkDto {
  @IsNumber({}, { message: 'idClub debe ser un número' })
  @IsPositive({ message: 'idClub debe ser un número positivo' })
  idClub: number;

  @IsNumber({}, { message: 'idSocialNetwork debe ser un número' })
  @IsPositive({ message: 'idSocialNetwork debe ser un número positivo' })
  idSocialNetwork: number;

  @IsString({ message: 'url debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'url no puede estar vacío' })
  url: string;
}
