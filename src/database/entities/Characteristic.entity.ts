import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tag } from './Tag.entity';
// import { CharacteristicToTagToGood } from './CharacteristicToTagToGood.entity';

@Entity()
export class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Tag, (tag) => tag.characteristics)
  tag: Tag;

  // @OneToMany(
  //   () => CharacteristicToTagToGood,
  //   (characteristicToTagToGood) => characteristicToTagToGood.characteristic,
  // )
  // characteristicToTagToGoods: CharacteristicToTagToGood[];
}
