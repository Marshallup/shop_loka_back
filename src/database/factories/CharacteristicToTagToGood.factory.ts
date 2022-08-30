import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { CharacteristicToTagToGood } from '../entities/CharacteristicToTagToGood.entity';

define(CharacteristicToTagToGood, () => {
  const table = new CharacteristicToTagToGood();

  table.characteristicId = +faker.random.numeric(1, { bannedDigits: ['0'] });
  table.goodId = +faker.random.numeric(1, { bannedDigits: ['0'] });
  table.tagId = +faker.random.numeric(1, { bannedDigits: ['0'] });

  return table;
});
