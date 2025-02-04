import { IsInt, Min, Max, IsString, IsMilitaryTime } from 'class-validator';

export class CreateHorarioAtencionDto {
  @IsInt()
  @Min(1, { message: 'El día debe ser mayor o igual a 1' })
  @Max(7, { message: 'El día debe ser menor o igual a 7' })
  dia: number;

  @IsString({ message: 'La hora de inicio debe ser un string' })
  @IsMilitaryTime({ message: 'La hora de inicio debe ser una hora válida' })
  hora_inicio: string;

  @IsString({ message: 'La hora de fin debe ser un string' })
  @IsMilitaryTime({ message: 'La hora de fin debe ser una hora válida' })
  hora_fin: string;
}
