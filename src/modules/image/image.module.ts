import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '@/database/entities/Image.entity';
import { ImageService } from '@/services/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService],
  controllers: [],
  exports: [ImageService],
})
export class ImageModule {}
