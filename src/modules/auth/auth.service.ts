import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(correo: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUser(correo);
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = {
      email: user.username,
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
    return this.userService.create({ clave: hashedPassword, ...dto });
  }

  async getPerfil(id: number) {
    const perfil = await this.userService.findOne(id);
    return {
      ...perfil,
      tipoUser: 'Admin',
    };
  }
}
