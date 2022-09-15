import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CharacteristicToTagToGood } from './CharacteristicToTagToGood.entity';
import { IngredientToTagToGood } from './IngredientToTagToGood.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => CharacteristicToTagToGood,
    (characteristicToTag) => characteristicToTag.tag,
  )
  characteristicToTagToGoods: CharacteristicToTagToGood[];

  @OneToMany(
    () => IngredientToTagToGood,
    (ingredientToTagToGood) => ingredientToTagToGood.tag,
  )
  ingredientToTagToGood: IngredientToTagToGood[];
}
