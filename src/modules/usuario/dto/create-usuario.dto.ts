import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  correo: string;

  @IsNotEmpty()
  @IsString()
  clave: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha_nac: Date;

  @IsNotEmpty()
  @IsString()
  telf: string;

  @IsOptional()
  @IsString()
  url?: string;
}
