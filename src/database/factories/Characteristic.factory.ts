import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Characteristic } from '../entities/Characteristic.entity';

define(Characteristic, () => {
  const characteristic = new Characteristic();

  characteristic.title = faker.random.word();

  return characteristic;
});
