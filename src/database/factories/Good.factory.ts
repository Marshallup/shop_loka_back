import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Good } from '../entities/Good.entity';

define(Good, () => {
  const good = new Good();

  good.title = faker.random.word();
  good.desc = faker.lorem.paragraphs();
  good.except = faker.lorem.paragraph();
  good.howUse = faker.lorem.paragraph();
  good.price = +faker.commerce.price(100, 200, 0);

  return good;
});
