import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateArtistaDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  nombre: string;

  @IsString({ message: 'El tipo debe ser un texto' })
  @IsOptional()
  tipo: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsOptional()
  descrip: string;

  @IsString({ message: 'La biografía debe ser un texto' })
  @IsOptional()
  biografia: string;

  @IsString({ message: 'Las etiquetas deben ser un texto' })
  @IsOptional()
  tags: string;

  @IsString({ message: 'La URL de la foto debe ser un texto' })
  @IsOptional()
  url_foto: string;

  @IsString({ message: 'La URL de la segunda foto debe ser un texto' })
  @IsOptional()
  url_foto2: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRedDto)
  redes: CreateRedDto[];
}

class CreateRedDto {
  @IsNumber()
  @IsPositive()
  id_red: number;

  @IsNotEmpty({ message: 'La URL es requerida' })
  @IsString({ message: 'La URL debe ser un texto' })
  url: string;
}
