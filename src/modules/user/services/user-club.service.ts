import { UserClubEntity } from '@entities/user-club.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { ClubService } from 'src/modules/club/services/club.service';

@Injectable()
export class UserClubService {
  constructor(
    @InjectRepository(UserClubEntity)
    private readonly userAuthRepo: Repository<UserClubEntity>,

    private readonly userService: UserService,
    private readonly clubService: ClubService,
  ) {}

  async create(userId: number, clubId: number) {
    const ifExists = await this.userAuthRepo.findOne({
      where: {
        user: { id: userId },
        club: { id: clubId },
      },
    });
    if (ifExists) {
      throw new ConflictException('User is already registered in this club');
    }

    const user = await this.userService.findOne(userId);

    const club = await this.clubService.findOne(clubId);

    const userClub = this.userAuthRepo.create({
      user: user,
      club: club,
    });

    await this.userAuthRepo.save(userClub);

    return userClub.id;
  }

  async findAllByUserId(userId: number) {
    return await this.userAuthRepo.find({
      relations: ['user', 'club'],
      where: {
        user: { id: userId },
      },
    });
  }

  async remove(userId: number, id: number) {
    const userClub = await this.userAuthRepo.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });

    if (!userClub) {
      throw new ConflictException('User is not registered in this club');
    }

    await this.userAuthRepo.remove(userClub);
  }
}
