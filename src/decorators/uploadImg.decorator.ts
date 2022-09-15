import { FOLDERS_NAMES } from '@/enums/foldersNames';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { join, parse } from 'path';

export function UploadImg(fileKey: string, folderName: string) {
  const destPath = join(FOLDERS_NAMES.CLIENT, folderName);

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fileKey, {
        storage: diskStorage({
          destination: destPath,
          filename: (req, file, cb) => {
            const { id } = req.params;
            const fileFoder = join(destPath, id);
            const filename = parse(file.originalname).name.replace(/\s/g, '');
            const extenstion = parse(file.originalname).ext;

            if (!existsSync(fileFoder)) {
              mkdirSync(fileFoder, { recursive: true });
            }

            cb(null, `${id}/${filename}${extenstion}`);
          },
        }),
      }),
    ),
  );
}
