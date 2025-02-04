import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { DiscotecaModule } from './modules/discoteca/discoteca.module';
import { EventoModule } from './modules/evento/evento.module';
import { ArtistaModule } from './modules/artista/artista.module';
import { CatEventoModule } from './modules/cat-evento/cat-evento.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedesModule } from './modules/redes/redes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '4h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuarioModule,
    DiscotecaModule,
    EventoModule,
    ArtistaModule,
    CatEventoModule,
    AuthModule,
    RedesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
