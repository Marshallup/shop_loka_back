import { User } from '@/database/entities/User.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userCreateDto: UserCreateDto) {
    const user = new User();

    user.username = userCreateDto.username;
    user.email = userCreateDto.email;
    user.password = userCreateDto.password;

    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  async findOne(username: User['username']) {
    return this.userRepository.findOne({
      where: { username },
      relations: { role: true },
    });
  }
}
