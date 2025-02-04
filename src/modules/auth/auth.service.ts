import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuarioService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(correo: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(correo);
    if (!(await bcrypt.compare(pass, user.clave))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = {
      correo: user.correo,
      id: user.id,
    };

    return {
      access_token: this.jwt.sign(payload),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async register({ clave, ...dto }: CreateUsuarioDto) {
    const hashedPassword = await this.hashPassword(clave);
    return this.usersService.create({ clave: hashedPassword, ...dto });
  }

  async getPerfil(id: number) {
    const perfil = await this.usersService.findOneById(id);
    return {
      ...perfil,
      tipoUser: perfil.tipoUser.nombre,
    };
  }
}
