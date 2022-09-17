import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Good } from '../entities/Good.entity';
import { Image } from '../entities/Image.entity';

define(Good, (_factory: Factory, { images }: { images: Image[] }) => {
  const good = new Good();

  const imageIdxRandom = Math.floor(Math.random() * 15);

  good.title = faker.random.word();
  good.desc = faker.lorem.paragraphs();
  good.except = faker.lorem.paragraph();
  good.howUse = faker.lorem.paragraph();
  good.mainPhoto = images[imageIdxRandom];
  good.price = +faker.commerce.price(100, 200, 0);

  return good;
});
