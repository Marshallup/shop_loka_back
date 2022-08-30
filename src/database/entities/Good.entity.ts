import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Image } from './Image.entity';
import { Category } from './Category.entity';
import { CharacteristicToTagToGood } from './CharacteristicToTagToGood.entity';
import { IngredientToTagToGood } from './IngredientToTagToGood.entity';

@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  mainPhoto: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column()
  desc: string;

  @Column({ nullable: true })
  except: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  howUse: string;

  @Column({ nullable: true })
  volume: string;

  @OneToMany(() => Image, (image) => image.path, {
    cascade: true,
    nullable: true,
  })
  images: Image[];

  @OneToMany(
    () => CharacteristicToTagToGood,
    (characteristicToTagToGood) => characteristicToTagToGood.good,
  )
  characteristicToTagToGoods: CharacteristicToTagToGood[];

  @OneToMany(
    () => IngredientToTagToGood,
    (ingredientToTagToGood) => ingredientToTagToGood.good,
  )
  ingredientToTagToGood: IngredientToTagToGood[];

  @ManyToMany(() => Category, (category) => category.good, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
