import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistType } from '../../../common/entities/artist-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistTypeService {
  constructor(
    @InjectRepository(ArtistType)
    private readonly repo: Repository<ArtistType>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }
}
