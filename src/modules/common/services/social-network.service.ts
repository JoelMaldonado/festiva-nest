import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialNetwork } from 'src/common/entities/social-network.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectRepository(SocialNetwork)
    private readonly repo: Repository<SocialNetwork>,
  ) {}

  async findAll() {
    const qb = this.repo.createQueryBuilder('social_network');
    const items = await qb.getMany();
    return items;
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Social Network not found');
    }
    return item;
  }
}
