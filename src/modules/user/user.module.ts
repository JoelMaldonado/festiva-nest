import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from '../../common/entities/user-auth.entity';
import { User } from '../../common/entities/user.entity';
import { UserRole } from '../../common/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth, UserRole, User])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
