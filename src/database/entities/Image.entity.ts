import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Good } from './Good.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToMany(() => Good, (good) => good.images)
  @OneToMany(() => Good, (good) => good.mainPhoto)
  good: Good;
}
