import { User } from '@/database/entities/User.entity';
import { Request } from 'express';

export type UserAuth = Pick<User, 'username' | 'id' | 'role'>;

export interface UserRequest extends Request {
  user: UserAuth;
}
