import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { getImagePath } from '@/utils/helpers';

export function UploadImg(fileKey: string, folderName: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fileKey, {
        storage: diskStorage({
          destination: folderName,
          filename: (req, file, cb) => {
            const filename = parse(file.originalname).name.replace(/\s/g, '');
            const extenstion = parse(file.originalname).ext;

            const filePath = getImagePath(folderName, filename, extenstion);

            cb(null, filePath);
          },
        }),
      }),
    ),
  );
}
