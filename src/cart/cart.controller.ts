import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';
import { USER_ROLES } from '@/enums/roles.enum';
import { RolesGuard } from '@/guards/roles.guard';
import { FormatResponseInterceptor } from '@/interceptors/format-response.interceptor';
import { UserRequest } from '@/types/request';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@UseInterceptors(FormatResponseInterceptor)
@Controller('cart')
export class CartController {
  constructor(private cartsService: CartService) {}

  @Roles(USER_ROLES.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getCart(@Request() req: UserRequest, @Param('id') id: number) {
    const cart = await this.cartsService
      .getCart(id, req.user.id)
      .catch((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      });

    if (!cart) {
      throw new HttpException('Корзина не найдена', HttpStatus.NOT_FOUND);
    }

    return cart;
  }

  @Roles(USER_ROLES.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCart(
    @Request() { user }: UserRequest,
    @Body() createCartDto: CreateCartDto,
  ) {
    return this.cartsService.createCart(user.id, createCartDto.goodsID);
  }
}
