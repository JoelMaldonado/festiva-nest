import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClubModule } from './modules/club/club.module';

@Module({
  imports: [ConfigModule.forRoot(), AdminModule, AuthModule, ClubModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
