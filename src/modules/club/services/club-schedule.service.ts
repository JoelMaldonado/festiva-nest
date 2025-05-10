import { ClubSchedule } from '@entities/club-schedule.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubService } from './club.service';

@Injectable()
export class ClubScheduleService {
  constructor(
    @InjectRepository(ClubSchedule)
    private readonly repo: Repository<ClubSchedule>,

    private readonly clubService: ClubService,
  ) {}

  async findAll(idClub: number) {
    const club = await this.clubService.findOne(idClub);

    const items = await this.repo.find({
      where: {
        club: club,
      },
    });
    return items;
  }

  async create(
    idClub: number,
    dayOfWeek: number,
    openingTime: string,
    closingTime: string,
  ) {
    const club = await this.clubService.findOne(idClub);

    const itemCreate = this.repo.create({
      club: club,
      dayOfWeek: dayOfWeek,
      openingTime: openingTime,
      closingTime: closingTime,
    });

    await this.repo.save(itemCreate);
    return itemCreate.id;
  }

  async delete(id: number) {
    const item = await this.repo.findOne({
      where: {
        id: id,
      },
    });

    if (!item) {
      throw new Error('Club schedule not found');
    }

    await this.repo.delete(id);
  }
}
