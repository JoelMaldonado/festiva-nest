import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserAuth } from '@entities/user-auth.entity';
import { User } from '@entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userAuthRepo: Repository<UserAuth>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    await this.userRepo.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepo.find({
      relations: ['userRole', 'status'],
    });
  }

  async findOne(id: number) {
    const item = await this.userAuthRepo.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('User not found');
    }
    return item;
  }

  async findOneByUser(user: string) {
    const item = await this.userAuthRepo.findOne({
      where: { username: user },
    });
    if (!item) {
      throw new NotFoundException('User not found');
    }
    return item;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
