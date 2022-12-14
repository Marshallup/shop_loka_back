import { UserRegisterDto } from './dto/user-register.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from '@/types/request';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneWithPassword(username);

    console.log(user, 'user');

    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: UserAuth = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userRegisterDto: UserRegisterDto) {
    return this.userService.createUser(userRegisterDto);
  }
}
