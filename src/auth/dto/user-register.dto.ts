import { User } from '@/database/entities/User.entity';

export class UserRegisterDto {
  username: User['username'];
  email: User['email'];
  password: User['password'];
}
