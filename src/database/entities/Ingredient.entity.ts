import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tag } from './Tag.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Tag, (tag) => tag.ingredients)
  tag: Tag;
}
