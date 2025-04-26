import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../../common/entities/artist.entity';
import { ArtistType } from '../../common/entities/artist-type.entity';
import { ArtistTypeController } from './controllers/artist-type.controller';
import { ArtistTypeService } from './services/artist-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, ArtistType])],
  exports: [ArtistService],
  controllers: [ArtistController, ArtistTypeController],
  providers: [ArtistService, ArtistTypeService],
})
export class ArtistModule {}
