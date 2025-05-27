import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from '../../common/entities/user-auth.entity';
import { User } from '../../common/entities/user.entity';
import { UserRole } from '../../common/entities/user-role.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserClubController } from './controllers/user-club.controller';
import { UserEventController } from './controllers/user-event.controller';
import { UserClubService } from './services/user-club.service';
import { UserEventService } from './services/user-event.service';
import { UserClubEntity } from '@entities/user-club.entity';
import { UserEventEntity } from '@entities/user-event.entity';
import { ClubModule } from '../club/club.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAuth,
      UserRole,
      User,
      UserClubEntity,
      UserEventEntity,
    ]),
    ClubModule,
    EventModule,
  ],
  exports: [UserService],
  controllers: [UserController, UserClubController, UserEventController],
  providers: [UserService, UserClubService, UserEventService],
})
export class UserModule {}
