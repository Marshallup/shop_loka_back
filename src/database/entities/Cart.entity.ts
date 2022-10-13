import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Good } from './Good.entity';
import { User } from './User.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToMany(() => Good, (good) => good.carts)
  @JoinTable()
  goods: Good[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
