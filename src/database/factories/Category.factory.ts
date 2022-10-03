import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Category } from '../entities/Category.entity';

define(
  Category,
  (
    _factory: Factory,
    {
      getUniqCategory,
    }: { getUniqCategory: (word: string | (() => string)) => string },
  ) => {
    const category = new Category();

    const title = getUniqCategory(faker.commerce.department);

    category.title = title;

    return category;
  },
);
