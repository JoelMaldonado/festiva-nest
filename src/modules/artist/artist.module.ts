import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../../common/entities/artist.entity';
import { ArtistType } from '../../common/entities/artist-type.entity';
import { ArtistTypeController } from './controllers/artist-type.controller';
import { ArtistTypeService } from './services/artist-type.service';
import { ArtistTagController } from './controllers/artist-tag.controller';
import { ArtistTagService } from './services/artist-tag.service';
import { ArtistTagEntity } from '@entities/artist-tag.entity';
import { ArtistSocialNetworkEntity } from '@entities/artist-social-network.entity';
import { ArtistSocialNetworkController } from './controllers/artist-social-network.controller';
import { ArtistSocialNetworkService } from './services/artist-social-network.service';
import { SocialNetworkService } from '../common/services/social-network.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Artist,
      ArtistType,
      ArtistTagEntity,
      ArtistSocialNetworkEntity,
    ]),
    CommonModule,
  ],
  exports: [ArtistService],
  controllers: [
    ArtistController,
    ArtistTypeController,
    ArtistTagController,
    ArtistSocialNetworkController,
  ],
  providers: [
    ArtistService,
    ArtistTypeService,
    ArtistTagService,
    ArtistSocialNetworkService,
  ],
})
export class ArtistModule {}
