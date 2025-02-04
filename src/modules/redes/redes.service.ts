import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Redes } from './entities/redes.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RedesService {
  constructor(
    @InjectRepository(Redes)
    private readonly repo: Repository<Redes>,
  ) {}
  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new Error('Red no encontrada');
    return item;
  }
}
