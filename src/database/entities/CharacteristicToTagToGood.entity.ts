import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Characteristic } from './Characteristic.entity';
import { Good } from './Good.entity';
import { Tag } from './Tag.entity';

@Entity()
export class CharacteristicToTagToGood {
  @PrimaryGeneratedColumn()
  characteristicToTagToGoodId: number;

  @Column()
  characteristicId: number;

  @Column()
  tagId: number;

  @Column()
  goodId: number;

  @ManyToOne(() => Characteristic, (characteristic) => characteristic)
  characteristic: Characteristic;

  @ManyToOne(() => Tag, (tag) => tag)
  tag: Tag;

  @ManyToOne(() => Good, (good) => good)
  good: Good;
}
