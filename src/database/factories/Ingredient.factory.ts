import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Tag } from '../entities/Tag.entity';
import { getRandomUniqIdx } from '../../utils/helpers';
import { Ingredient } from '../entities/Ingredient.entity';

define(Ingredient, (_factory: Factory, { tags }: { tags: Tag[] }) => {
  const getRandomTag = getRandomUniqIdx(tags);

  const ingredient = new Ingredient();

  ingredient.title = faker.random.word();
  ingredient.tag = getRandomTag();

  return ingredient;
});
