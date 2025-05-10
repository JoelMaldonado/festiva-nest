import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubPhoneEntity } from '@entities/club-phone.entity';
import { isPhoneNumber } from 'class-validator';
import { ClubService } from './club.service';

@Injectable()
export class ClubPhoneService {
  constructor(
    @InjectRepository(ClubPhoneEntity)
    private readonly repository: Repository<ClubPhoneEntity>,

    private readonly clubService: ClubService,
  ) {}

  async findAll(idClub: number) {
    const club = await this.clubService.findOne(idClub);

    const items = await this.repository.find({
      where: { club: club },
      order: { id: 'ASC' },
    });
    return items;
  }

  async create(idClub: number, phone: string) {
    const club = await this.clubService.findOne(idClub);

    if (!isPhoneNumber(phone)) {
      throw new ConflictException('Formato de teléfono no válido');
    }

    const phoneExist = await this.repository.findOne({
      where: { club: club, phone: phone },
    });

    if (phoneExist) {
      throw new ConflictException('El teléfono ya existe');
    }

    const itemCreate = this.repository.create({
      club: club,
      phone: phone,
    });
    await this.repository.save(itemCreate);
    return itemCreate.id;
  }

  async delete(id: number) {
    const item = await this.repository.findOne({ where: { id: id } });
    if (!item) {
      throw new ConflictException('El teléfono no existe');
    }
    await this.repository.delete(id);
    return item.id;
  }
}
