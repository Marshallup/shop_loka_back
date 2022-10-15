import { Role } from '@/database/entities/Role.entity';
import { User } from '@/database/entities/User.entity';
import { RoleService } from '@/role/role.service';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, RoleService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
