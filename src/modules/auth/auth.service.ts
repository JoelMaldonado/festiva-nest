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
      email: user.correo,
      id: user.id,
    };

    const access_token = this.jwt.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwt.sign(payload, { expiresIn: '30d' });

    return { access_token, refresh_token };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwt.verify(token);
      const newAccessToken = this.jwt.sign(
        { sub: decoded.sub, email: decoded.email },
        { expiresIn: '15m' },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh Token inválido');
    }
  }

  async register({ clave, ...dto }: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(clave, salt);
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
