import { join } from 'path';
import * as moment from 'moment';
import { v4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

export function createFolderIfNotExists(fileFoder: string) {
  if (!existsSync(fileFoder)) {
    mkdirSync(fileFoder, { recursive: true });
  }
}

export function getImagePath(
  destPath: string,
  name: string,
  extenstion: string,
) {
  const fileFolderDate = moment().format('DD-MM-YYYY');
  const fileFoder = join(destPath, fileFolderDate);

  createFolderIfNotExists(fileFoder);

  return `${fileFolderDate}/${name}_${v4()}${extenstion}`;
}
