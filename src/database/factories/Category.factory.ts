import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Category } from '../entities/Category.entity';

define(Category, () => {
  const category = new Category();

  category.title = faker.random.word();

  return category;
});
