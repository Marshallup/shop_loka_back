import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Order } from './Order.entity';
import { OrderItem } from './OrderItem.entity';
import { User } from './User.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @OneToOne(() => Order, (order) => order.cart, { nullable: true })
  order: Order;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.cart)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
