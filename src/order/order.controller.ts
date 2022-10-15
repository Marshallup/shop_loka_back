import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import { USER_ROLES } from '@/enums/roles.enum';
import { UserRequest } from '@/types/request';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Roles(USER_ROLES.USER)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req: UserRequest) {
    console.log(req.user, 'user');
  }
}
