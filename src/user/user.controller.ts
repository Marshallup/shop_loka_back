import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import { USER_ROLES } from '@/enums/roles.enum';
import { RolesGuard } from '@/guards/roles.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Roles(USER_ROLES.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
