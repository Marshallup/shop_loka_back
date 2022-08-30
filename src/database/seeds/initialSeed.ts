import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Tag } from '../entities/Tag.entity';
import { Good } from '../entities/Good.entity';
import { Characteristic } from '../entities/Characteristic.entity';
import { CharacteristicToTagToGood } from '../entities/CharacteristicToTagToGood.entity';

console.log(process.env.DB_NAME, 'db_name');

export default class InitialDatabaseSeed implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, __connection: Connection): Promise<void> {
    await factory(Tag)().createMany(15);
    await factory(Good)().createMany(15);
    await factory(Characteristic)().createMany(15);
    await factory(CharacteristicToTagToGood)().createMany(15);

    // await factory(Post)()
    //   .map(async (post) => {
    //     post.user = users[Math.floor(Math.random() * users.length)];
    //     return post;
    //   })
    //   .createMany(100);
  }
}