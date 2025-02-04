import { IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    correo: string

    @IsNotEmpty()
    clave: string
    
}