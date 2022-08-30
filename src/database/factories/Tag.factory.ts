import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Tag } from '../entities/Tag.entity';

define(Tag, () => {
  const tag = new Tag();

  tag.title = faker.random.word();

  return tag;
});
