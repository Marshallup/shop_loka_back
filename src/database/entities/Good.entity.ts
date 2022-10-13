import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Image } from './Image.entity';
import { Category } from './Category.entity';
import { Tag } from './Tag.entity';
import { Cart } from './Cart.entity';

@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ nullable: false })
  vendorCode: string;

  @ManyToOne(() => Image, (image) => image.good, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  mainPhoto: Image;

  @ManyToMany(() => Image, (image) => image.good, {
    cascade: true,
  })
  @JoinTable()
  images: Image[];

  @ManyToMany(() => Tag, (tag) => tag.good)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => Cart, (cart) => cart.goods)
  carts: Cart[];

  @ManyToOne(() => Category, (category) => category.good, {
    cascade: true,
  })
  category: Category;
}
