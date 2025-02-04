import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, UsuarioModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
