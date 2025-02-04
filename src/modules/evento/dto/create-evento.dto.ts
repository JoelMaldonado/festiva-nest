import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsInt,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateEventoDto {
  @IsString({ message: 'El titulo debe ser un texto' })
  @IsNotEmpty({ message: 'Debe incluir un titulo' })
  titulo: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'Debe incluir una descripción' })
  descrip: string;

  @IsString({ message: 'La url de la foto debe ser un texto' })
  @IsNotEmpty({ message: 'Debe incluir una url de la foto' })
  url_foto: string;

  @IsNotEmpty({ message: 'Debe incluir una fecha' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida' })
  fecha: Date;

  @IsString({ message: 'La hora debe ser un string' })
  @IsNotEmpty({ message: 'Debe incluir una hora' })
  @IsMilitaryTime({ message: 'La hora debe ser una hora válida' })
  hora: string;

  @IsNumber({}, { message: 'La categoria debe ser un número' })
  @IsPositive({ message: 'La categoria debe ser un número positivo' })
  idCategoria: number;

  @IsNumber({}, { message: 'La discoteca debe ser un número' })
  @IsPositive({ message: 'La discoteca debe ser un número positivo' })
  idDiscoteca: number;

  @IsArray({ message: 'Los artistas deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un artista' })
  @IsInt({ each: true, message: 'Cada artista debe ser un número entero' })
  artistas: number[];
}
