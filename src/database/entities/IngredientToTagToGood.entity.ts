import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ingredient } from './Ingredient.entity';
import { Good } from './Good.entity';
import { Tag } from './Tag.entity';

@Entity()
export class IngredientToTagToGood {
  @PrimaryGeneratedColumn()
  ingredientToTagToGoodId: number;

  @Column()
  ingredientId: number;

  @Column()
  tagId: number;

  @Column()
  goodId: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient)
  ingredient: Ingredient;

  @ManyToOne(() => Tag, (tag) => tag)
  tag: Tag;

  @ManyToOne(() => Good, (good) => good)
  good: Good;
}
