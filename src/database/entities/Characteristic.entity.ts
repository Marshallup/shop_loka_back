import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CharacteristicToTagToGood } from './CharacteristicToTagToGood.entity';

@Entity()
export class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => CharacteristicToTagToGood,
    (characteristicToTagToGood) => characteristicToTagToGood.characteristic,
  )
  characteristicToTagToGoods: CharacteristicToTagToGood[];
}
