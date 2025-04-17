import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../common/entities/event.entity';
import { Artist } from '../../common/entities/artist.entity';
import { Club } from '../../common/entities/club.entity';
import { Status } from 'src/common/entities/status.entity';
import { SocialNetwork } from 'src/common/entities/social-network.entity';
import { SocialNetworkController } from './controllers/social-network.controller';
import { SocialNetworkService } from './services/social-network.service';
import { UserRoleController } from './controllers/user-role.controller';
import { UserRoleService } from './services/user-role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Artist, Club, Status, SocialNetwork]),
  ],
  controllers: [CommonController, SocialNetworkController, UserRoleController],
  providers: [CommonService, SocialNetworkService, UserRoleService],
})
export class CommonModule {}
