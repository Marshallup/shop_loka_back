import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Tag } from '../entities/Tag.entity';
import { Good } from '../entities/Good.entity';
import { Characteristic } from '../entities/Characteristic.entity';
import { Category } from '../entities/Category.entity';
import { Image } from '../entities/Image.entity';
import { Ingredient } from '../entities/Ingredient.entity';

export default class InitialDatabaseSeed implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, __connection: Connection): Promise<void> {
    const tags = await factory(Tag)().createMany(15);

    const categories = await factory(Category)().createMany(15);
    const images = await factory(Image)().createMany(15);
    await factory(Good)({ images, categories, tags }).createMany(15);
    await factory(Characteristic)({ tags }).createMany(15);
    await factory(Ingredient)({ tags }).createMany(15);

    // await factory(Post)()
    //   .map(async (post) => {
    //     post.user = users[Math.floor(Math.random() * users.length)];
    //     return post;
    //   })
    //   .createMany(100);
  }
}
