import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Characteristic } from '../entities/Characteristic.entity';
import { Tag } from '../entities/Tag.entity';
import { getRandomIdx } from '../../utils/helpers';

define(Characteristic, (_factory: Factory, { tags }: { tags: Tag[] }) => {
  function getRandomInitImg<T>(arr: T) {
    const randomIdxs = [];

    return function innerFn() {
      const randomIdx = getRandomIdx();

      if (randomIdxs.indexOf(randomIdx) > -1) {
        return innerFn();
      }

      randomIdxs.push(randomIdx);

      return arr[randomIdx];
    };
  }
  const getRandomTag = getRandomInitImg(tags);

  const characteristic = new Characteristic();

  characteristic.title = faker.random.word();
  characteristic.tag = getRandomTag();

  return characteristic;
});
