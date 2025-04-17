import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialNetwork } from 'src/common/entities/social-network.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectRepository(SocialNetwork)
    private readonly socialNetworkRepo: Repository<SocialNetwork>,
  ) {}

  async findAll() {
    const items = await this.socialNetworkRepo.find();
    return items;
  }
}
