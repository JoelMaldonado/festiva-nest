import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateHorarioAtencionDto } from './create-horario-atencion.dto';
import { CreateRedDto } from './create-red.dto';

export class CreateDiscotecaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descrip: string = '';

  @IsString()
  @IsOptional()
  url_logo: string = '';

  @IsString()
  @IsOptional()
  url_portada: string = '';

  @IsString()
  @IsOptional()
  direc: string = '';

  @IsString()
  @IsOptional()
  url_maps: string = '';

  @IsString()
  @IsNotEmpty()
  telf: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHorarioAtencionDto)
  horariosAtencion: CreateHorarioAtencionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRedDto)
  redes: CreateRedDto[];
}
