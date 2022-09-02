import { FOLDERS_PATHS } from '@/constants/foldersPaths';
import { UploadImg } from '@/decorators/uploadImg.decorator';
import { GoodService } from '@/services/good/good.service';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('good')
export class GoodController {
  constructor(private goodsService: GoodService) {}

  @Get()
  async getAll() {
    return this.goodsService.findAll();
  }

  @Post(':id/upload-main-image')
  @HttpCode(HttpStatus.OK)
  @UploadImg('image', FOLDERS_PATHS.GOOD_IMAGES)
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.goodsService.setMainImage(id, file.path);
  }
}
