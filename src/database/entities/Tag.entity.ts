import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Characteristic } from './Characteristic.entity';
import { Good } from './Good.entity';
import { Ingredient } from './Ingredient.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Good, (good) => good.tags)
  good: Good;

  @OneToMany(() => Characteristic, (characteristic) => characteristic.tag)
  characteristics: Characteristic[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.tag)
  ingredients: Ingredient[];
}
