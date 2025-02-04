import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { correo, clave }: LoginDto) {
    return await this.authService.validateUser(correo, clave);
  }

  @Post('register')
  async register(@Body() dto: CreateUsuarioDto) {
    return await this.authService.register(dto);
  }

  @UseGuards(AuthGuard)
  @Post('validar-sesion')
  validarSesion() {
    return { mensaje: 'Sesión válida' };
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  getPerfil(
    @Req() req
  ) {
    const id = req.user.id;
    return this.authService.getPerfil(id);
  }
}
