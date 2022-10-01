import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Characteristic } from '../entities/Characteristic.entity';
import { Tag } from '../entities/Tag.entity';
import { getRandomUniqIdx } from '../../utils/helpers';

define(Characteristic, (_factory: Factory, { tags }: { tags: Tag[] }) => {
  const getRandomTag = getRandomUniqIdx(tags);

  const characteristic = new Characteristic();

  characteristic.title = faker.random.word();
  characteristic.tag = getRandomTag();

  return characteristic;
});
