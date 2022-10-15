import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart.entity';
import { User } from './User.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @OneToOne(() => Cart, (cart) => cart.order, { nullable: true })
  cart: Cart;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
