import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Good } from './Good.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Good, (good) => good.images)
  good: Good;
}
