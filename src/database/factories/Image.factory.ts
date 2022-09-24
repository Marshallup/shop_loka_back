import { readdirSync, copyFileSync } from 'fs';
import { getImagePath } from '../../utils/helpers';
import { join, parse } from 'path';
import { define } from 'typeorm-seeding';
import { Image } from '../entities/Image.entity';
import { FOLDERS_PATHS } from '../../constants/foldersPaths';

define(Image, () => {
  const image = new Image();

  try {
    const photoIdxRandom = Math.floor(Math.random() * 15);
    const photoCurPath = join(__dirname, '../../../public/images/good');
    const photoSeedPath = join(
      __dirname,
      '../../assets/images/seeds/good/mainPhoto',
    );
    const mainPhotos = readdirSync(photoSeedPath);
    const randomPhoto = mainPhotos[photoIdxRandom] || mainPhotos[0];
    const imageName = parse(randomPhoto).name;
    const imageExt = parse(randomPhoto).ext;

    const imagePath = getImagePath(
      FOLDERS_PATHS.GOOD_IMAGES,
      imageName,
      imageExt,
    );

    const copiedImagePath = join(photoSeedPath, randomPhoto);
    const rootDestPath = join(photoCurPath, imagePath);

    copyFileSync(copiedImagePath, rootDestPath);

    image.path = join(FOLDERS_PATHS.GOOD_IMAGES, imagePath);
  } catch (error) {
    console.error(error, 'ошибка при установке главного фото');
  }

  return image;
});
