import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userAuthRepository: Repository<UserAuth>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const item = await this.userAuthRepository.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('User not found');
    }
    return item;
  }

  async findOneByUser(user: string) {
    const item = await this.userAuthRepository.findOne({
      where: { username: user },
    });
    if (!item) {
      throw new NotFoundException('User not found');
    }
    return item;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
