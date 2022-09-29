import { FOLDERS_PATHS } from '@/constants/foldersPaths';
import { JsonQuery } from '@/decorators/jsonQuery.decorator';
import { UploadImg } from '@/decorators/uploadImg.decorator';
import { GoodService } from '@/services/good/good.service';
import { IGetAllFilter } from '@/services/good/types';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  Param,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

@Controller('goods')
export class GoodController {
  constructor(private goodsService: GoodService) {}

  @Get()
  async getAll(
    @JsonQuery('filter')
    filter: IGetAllFilter,
  ) {
    return this.goodsService.findAll(filter);
  }

  @Get(':id')
  async getByID(@Param('id') id: number) {
    if (!isNaN(+id)) {
      return this.goodsService.findByID(id);
    }

    throw new HttpException(
      'Неккоректный айди для запроса',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post(':id/update-main-image')
  @HttpCode(HttpStatus.OK)
  @UploadImg('image', FOLDERS_PATHS.GOOD_IMAGES)
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.goodsService.setMainImage(id, file.path);
  }
}
