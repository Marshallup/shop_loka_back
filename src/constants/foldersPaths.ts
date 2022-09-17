import { FOLDERS_NAMES } from '@/enums/foldersNames';
import { join } from 'path';

export const FOLDERS_PATHS = Object.freeze({
  ROOT_PATH: join(__dirname, '../../'),
  IMAGES: join(FOLDERS_NAMES.CLIENT, FOLDERS_NAMES.IMAGES),
  GOOD_IMAGES: join(
    FOLDERS_NAMES.CLIENT,
    FOLDERS_NAMES.IMAGES,
    FOLDERS_NAMES.GOOD,
  ),
});
