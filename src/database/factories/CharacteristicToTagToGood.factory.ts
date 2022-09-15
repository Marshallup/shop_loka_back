import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Characteristic } from '../entities/Characteristic.entity';
import { CharacteristicToTagToGood } from '../entities/CharacteristicToTagToGood.entity';
import { Good } from '../entities/Good.entity';
import { Tag } from '../entities/Tag.entity';

define(
  CharacteristicToTagToGood,
  (
    _factory: Factory,
    {
      tags,
      goods,
      characteristics,
    }: { tags: Tag[]; goods: Good[]; characteristics: Characteristic[] },
  ) => {
    function getRandomIdx() {
      return +faker.random.numeric(1, { bannedDigits: ['0'] });
    }

    const table = new CharacteristicToTagToGood();

    table.good = goods[getRandomIdx()];
    table.tag = tags[getRandomIdx()];
    table.characteristic = characteristics[getRandomIdx()];

    return table;
  },
);
