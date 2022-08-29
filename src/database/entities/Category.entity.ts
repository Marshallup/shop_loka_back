import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Good } from './Good.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Good, (good) => good.categories)
  good: Good;
}
