import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubService } from '../club.service';
import { ClubEmailEntity } from '@entities/club-email.entity';
import { isEmail } from 'class-validator';

@Injectable()
export class ClubEmailService {
  constructor(
    @InjectRepository(ClubEmailEntity)
    private readonly repository: Repository<ClubEmailEntity>,

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

  async create(idClub: number, email: string) {
    const club = await this.clubService.findOne(idClub);

    if (!isEmail(email)) {
      throw new ConflictException('Formato de correo no válido');
    }

    const emailExist = await this.repository.findOne({
      where: { club: club, email: email },
    });
    if (emailExist) {
      throw new ConflictException('El correo ya existe');
    }

    const itemCreate = this.repository.create({
      club: club,
      email: email,
    });
    await this.repository.save(itemCreate);
    return itemCreate.id;
  }

  async delete(id: number) {
    const item = await this.repository.findOne({ where: { id: id } });
    if (!item) {
      throw new ConflictException('El correo no existe');
    }
    await this.repository.delete(id);
    return item.id;
  }
}
