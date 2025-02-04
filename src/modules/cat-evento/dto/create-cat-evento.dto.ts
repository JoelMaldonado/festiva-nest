import { IsNotEmpty, IsString } from "class-validator";

export class CreateCatEventoDto {

    @IsNotEmpty()
    @IsString()
    nombre: string

}
