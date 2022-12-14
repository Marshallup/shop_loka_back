import { faker } from '@faker-js/faker';
import { define, Factory } from 'typeorm-seeding';
import { Category } from '../entities/Category.entity';
import { Good } from '../entities/Good.entity';
import { Image } from '../entities/Image.entity';
import { Tag } from '../entities/Tag.entity';
import { getRandomUniqIdx } from '../../utils/helpers';

define(
  Good,
  (
    _factory: Factory,
    {
      images,
      categories,
      tags,
    }: { images: Image[]; categories: Category[]; tags: Tag[] },
  ) => {
    const getRandomImg = getRandomUniqIdx(images);
    const getRandomCategory = getRandomUniqIdx(categories);
    const getRandomTag = getRandomUniqIdx(tags);

    const good = new Good();

    good.title = faker.commerce.productName();
    good.desc = `<p>${faker.commerce.productDescription()}</p><p>${faker.lorem.paragraphs()}</p>`;
    good.except = faker.lorem.paragraph();
    good.howUse = faker.lorem.paragraph();
    good.mainPhoto = getRandomImg();
    good.price = +faker.commerce.price(100, 2000, 0);
    good.volume = String(Math.floor(Math.random() * 220));
    good.category = getRandomCategory();
    good.vendorCode = `${faker.random.numeric()}-${faker.random.word()}`;
    good.images = [getRandomImg(), getRandomImg(), getRandomImg()];
    good.tags = [getRandomTag(), getRandomTag(), getRandomTag()];

    return good;
  },
);
