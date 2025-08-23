import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../../common/entities/event.entity';
import { Artist } from '../../common/entities/artist.entity';
import { Club } from '../../common/entities/club.entity';
import { Status } from 'src/common/entities/status.entity';
import { SocialNetwork } from 'src/common/entities/social-network.entity';
import { SocialNetworkController } from './controllers/social-network.controller';
import { SocialNetworkService } from './services/social-network.service';
import { UserRoleController } from './controllers/user-role.controller';
import { UserRoleService } from './services/user-role.service';
import { CommonController } from './controllers/common.controller';
import { CommonService } from './services/common.service';
import { FirebaseModule } from 'src/services/firebase.module';
import { ClubDetail } from '@entities/club-detail.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      Artist,
      Club,
      Status,
      SocialNetwork,
    ]),
    FirebaseModule,
  ],
  exports: [SocialNetworkService, CommonService],
  controllers: [CommonController, SocialNetworkController, UserRoleController],
  providers: [CommonService, SocialNetworkService, UserRoleService],
})
export class CommonModule {}
