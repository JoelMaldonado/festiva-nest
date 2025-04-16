import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthGuard as AuthGuard2 } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() { correo, clave }: LoginDto) {
    return await this.authService.validateUser(correo, clave);
  }

  @Get('refresh')
  async refresh(@Body('refresh_token') token: string) {
    return this.authService.refreshToken(token);
  }

  @Post('register')
  async register(@Body() dto: any) {
    return await this.authService.register(dto);
  }

  @UseGuards(AuthGuard)
  @Post('validar-sesion')
  validarSesion() {
    return { mensaje: 'Sesión válida' };
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  getPerfil(@Req() req) {
    const id = req.user.id;
    return this.authService.getPerfil(id);
  }
}
