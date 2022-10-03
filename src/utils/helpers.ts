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

export function getRandomIdx(maxIdx = 15) {
  return Math.floor(Math.random() * maxIdx);
}

export function getRandomUniqIdx<T extends unknown[]>(arr: T, maxIdx = 15) {
  const randomIdxs = [];

  return function innerFn() {
    const randomIdx = getRandomIdx(maxIdx);

    if (randomIdxs.indexOf(randomIdx) > -1) {
      return innerFn();
    }

    randomIdxs.push(randomIdx);

    return arr[randomIdx];
  };
}

export function getInitUniqWord() {
  const arrUniqWord: string[] = [];

  return function innerFn(word: string | (() => string)): string {
    const w = word instanceof Function ? word() : word;

    if (arrUniqWord.includes(w)) {
      return innerFn(word);
    }

    arrUniqWord.push(w);

    return w;
  };
}
