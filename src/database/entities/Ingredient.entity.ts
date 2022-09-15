import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IngredientToTagToGood } from './IngredientToTagToGood.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => IngredientToTagToGood,
    (ingredientToTagToGood) => ingredientToTagToGood.ingredient,
  )
  ingredientToTagToGoods: IngredientToTagToGood[];
}
