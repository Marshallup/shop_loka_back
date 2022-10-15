import { User } from '@/database/entities/User.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/database/entities/Role.entity';
import { RoleService } from '@/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async createUser(
    userCreateDto: UserCreateDto,
    roleID?: Role['id'],
  ): Promise<User['id']> {
    const user = new User();

    user.role = new Role();

    if (!roleID) {
      const userRoleID = await this.roleService.getRoleByNameOrCreate();

      user.role.id = userRoleID;
    } else {
      user.role.id = roleID;
    }

    user.username = userCreateDto.username;
    user.email = userCreateDto.email;
    user.password = userCreateDto.password;

    const newUser = await this.userRepository.save(user);

    return newUser.id;
  }

  async findOneWithPassword(username: User['username']) {
    return this.userRepository.findOne({
      where: { username },
      relations: { role: true },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }

  async findOne(username: User['username']) {
    return this.userRepository.findOne({
      where: { username },
      relations: { role: true },
    });
  }
}
