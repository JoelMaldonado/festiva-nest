import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { ClubModule } from './modules/club/club.module';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { EventModule } from './modules/event/event.module';
import { FirebaseModule } from './services/firebase.module';
import { UiModule } from './modules/ui/ui.module';
import { CronModule } from './modules/cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedirectModule } from './modules/redirect/redirect.module';
import { MailModule } from './modules/mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { DinamycQrCodesModule } from './modules/dinamyc-qr-codes/dinamyc-qr-codes.module';

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
      synchronize: false,
    }),
    PrismaModule,
    AuthModule,
    CommonModule,
    ClubModule,
    UserModule,
    ArtistModule,
    EventModule,
    FirebaseModule,
    UiModule,
    CronModule,
    ScheduleModule.forRoot(),
    RedirectModule,
    MailModule,
    DinamycQrCodesModule,
  ],
})
export class AppModule {}
