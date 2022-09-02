import { FOLDERS_PATHS } from '@/constants/foldersPaths';
import { Good } from '@/database/entities/Good.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, readdirSync, rmSync } from 'fs';
import { basename, dirname, join } from 'path';
import { Repository } from 'typeorm';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(Good)
    private goodsRepository: Repository<Good>,
  ) {}

  async findAll(): Promise<Good[]> {
    return this.goodsRepository.find({
      relations: {
        categories: true,
        characteristics: {
          tag: true,
          characteristic: true,
        },
      },
    });
  }

  async setMainImage(id: string, imagePath: string) {
    const result = await this.goodsRepository.update(id, {
      mainPhoto: imagePath,
    });

    if (result.affected === 0) {
      this.removeImage(join(FOLDERS_PATHS.ROOT_PATH, imagePath));

      throw new HttpException(`Товар "${id}" не найден.`, HttpStatus.NOT_FOUND);
    }

    return `Главное фото товара ${id} успешно обновлено на ${basename(
      imagePath,
    )}`;
  }

  removeImage(imagePath: string) {
    if (existsSync(imagePath)) {
      const folderName = dirname(imagePath);
      const files = readdirSync(folderName);

      if (files.length > 1) {
        rmSync(imagePath);
      } else {
        rmSync(folderName, { recursive: true });
      }

      return true;
    }

    return false;
  }
}
