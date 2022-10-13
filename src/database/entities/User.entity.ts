import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cart } from './Cart.entity';
import { Role } from './Role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  // @Column()
  // firstName: string;

  // @Column()
  // lastName: string;

  // @Column()
  // age: number;
}
