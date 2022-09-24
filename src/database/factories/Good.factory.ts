import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Category } from '../entities/Category.entity';
import { Good } from '../entities/Good.entity';
import { Image } from '../entities/Image.entity';

function getRandomIdx() {
  return Math.floor(Math.random() * 15);
}

define(
  Good,
  (
    _factory: Factory,
    { images, categories }: { images: Image[]; categories: Category[] },
  ) => {
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

    const getRandomImg = getRandomInitImg(images);
    const getRandomCategory = getRandomInitImg(categories);

    const good = new Good();

    good.title = faker.random.word();
    good.desc = faker.lorem.paragraphs();
    good.except = faker.lorem.paragraph();
    good.howUse = faker.lorem.paragraph();
    good.mainPhoto = getRandomImg();
    good.price = +faker.commerce.price(100, 2000, 0);
    good.volume = String(Math.floor(Math.random() * 220));
    good.category = getRandomCategory();
    good.images = [getRandomImg(), getRandomImg(), getRandomImg()];

    return good;
  },
);
