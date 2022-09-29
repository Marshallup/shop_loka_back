import { FOLDERS_PATHS } from '@/constants/foldersPaths';
import { Good } from '@/database/entities/Good.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, readdirSync, rmSync } from 'fs';
import { basename, dirname, join } from 'path';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ImageService } from '../image/image.service';
import { FILTER_ALL } from '@/constants/query';
import { IGetAllFilter } from './types';
import { Category } from '@/database/entities/Category.entity';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(Good)
    private goodsRepository: Repository<Good>,
    private imageService: ImageService,
  ) {}

  // formatGoodCharacteristics(good: Good) {
  //   const chArr = [];

  //   good.characteristics?.forEach((ch) => {
  //     const tagID = ch.tag.id;

  //     if (tagID) {
  //       const chsByTagId = good.characteristics.filter(
  //         (item) => item?.tag?.id === tagID,
  //       );

  //       chArr.push({
  //         id: ch.id,
  //         tag: {
  //           ...ch.tag,
  //         },
  //         characteristics: chsByTagId?.map((item) => ({
  //           ...item.characteristic,
  //         })),
  //       });
  //     }
  //   });

  //   return {
  //     ...good,
  //     characteristics: chArr,
  //   };
  // }

  async findByID(id: number) {
    // const res = await this.goodsRepository
    //   .createQueryBuilder('good')
    //   .leftJoinAndSelect('good.category', 'category')
    //   .leftJoinAndSelect('good.images', 'images')
    //   .leftJoinAndSelect('good.mainPhoto', 'mainPhoto')
    //   .leftJoinAndSelect('good.characteristics', 'characteristics')
    //   .leftJoinAndSelect('characteristics.tag', 'tag')
    //   .leftJoinAndSelect('characteristics.characteristic', 'characteristic')
    //   .where('good.id = :id', { id })
    //   .getOne();

    // console.log(res, 'res');
    // return res;

    return this.goodsRepository.findOne({
      where: { id },
      relations: {
        category: true,
        images: true,
        mainPhoto: true,
        tags: {
          characteristics: true,
        },
        // characteristics: {
        //   tag: true,
        //   characteristic: true,
        // },
      },
    });

    // res.characteristics = [{ ee: 'ss' }];

    // return res;
  }

  async findAll(filter?: IGetAllFilter): Promise<Good[]> {
    const whereFilter: { category?: FindOptionsWhere<Category> } = {};

    if (filter?.categoryID && filter.categoryID !== FILTER_ALL) {
      whereFilter.category = {
        id: filter.categoryID,
      };
    }

    return this.goodsRepository.find({
      relations: {
        category: true,
        images: true,
        mainPhoto: true,
      },
      where: {
        ...whereFilter,
      },
    });
  }

  async setMainImage(id: string, imagePath: string) {
    console.log(imagePath, 'imagePth');
    const image = await this.imageService.createImage(imagePath);

    const result = await this.goodsRepository.update(id, {
      mainPhoto: image,
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
