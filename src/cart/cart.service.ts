import { Cart } from '@/database/entities/Cart.entity';
import { User } from '@/database/entities/User.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private CartsRepository: Repository<Cart>,
  ) {}

  async getCart(id: number, userID: number) {
    return this.CartsRepository.findOne({
      where: {
        id,
        user: {
          id: userID,
        },
      },
      relations: {
        // goods: true,
        orderItems: true,
      },
      loadRelationIds: {
        relations: ['user'],
      },
    });
  }

  async createCart(userID: User['id'], goodsInfo: CreateCartDto['goods']) {
    // const cart = this.CartsRepository.create({
    //   user: {
    //     id: userID,
    //   },
    //   goods: [...goodsID.map((goodID) => ({ id: goodID }))],
    // });

    // const newCart = await this.CartsRepository.save(cart);

    // return newCart.id;

    console.log(userID, goodsInfo);

    return 1;
  }
}
