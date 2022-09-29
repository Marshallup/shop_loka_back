import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Characteristic } from './Characteristic.entity';
// import { CharacteristicToTagToGood } from './CharacteristicToTagToGood.entity';
import { Good } from './Good.entity';
import { IngredientToTagToGood } from './IngredientToTagToGood.entity';

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

  // @OneToMany(
  //   () => CharacteristicToTagToGood,
  //   (characteristicToTag) => characteristicToTag.tag,
  // )
  // characteristicToTagToGoods: CharacteristicToTagToGood[];

  @OneToMany(
    () => IngredientToTagToGood,
    (ingredientToTagToGood) => ingredientToTagToGood.tag,
  )
  ingredientToTagToGood: IngredientToTagToGood[];
}
