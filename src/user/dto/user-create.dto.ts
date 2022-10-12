import { User } from '@/database/entities/User.entity';

export class UserCreateDto {
  username: User['username'];
  email: User['email'];
  password: User['password'];
}
