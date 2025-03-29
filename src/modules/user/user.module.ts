import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth, UserRole, User])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
