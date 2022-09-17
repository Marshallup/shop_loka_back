import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Tag } from '../entities/Tag.entity';
import { Good } from '../entities/Good.entity';
import { Characteristic } from '../entities/Characteristic.entity';
import { CharacteristicToTagToGood } from '../entities/CharacteristicToTagToGood.entity';
import { Category } from '../entities/Category.entity';
import { Image } from '../entities/Image.entity';

export default class InitialDatabaseSeed implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, __connection: Connection): Promise<void> {
    const tags = await factory(Tag)().createMany(15);

    await factory(Category)().createMany(15);

    const images = await factory(Image)().createMany(15);

    // console.log(images, 'images');

    const goods = await factory(Good)({ images }).createMany(15);
    const characteristics = await factory(Characteristic)().createMany(15);

    await factory(CharacteristicToTagToGood)({
      tags,
      goods,
      characteristics,
    }).createMany(15);

    // await factory(Post)()
    //   .map(async (post) => {
    //     post.user = users[Math.floor(Math.random() * users.length)];
    //     return post;
    //   })
    //   .createMany(100);
  }
}
