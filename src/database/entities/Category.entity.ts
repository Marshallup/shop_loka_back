import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Good } from './Good.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => Good, (good) => good.category)
  good: Good[];
}
