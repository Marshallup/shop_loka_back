import { Image } from '@/database/entities/Image.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async createImage(path: string): Promise<Image> {
    const image = new Image();

    image.path = path;

    return this.imageRepository.save(image);
  }
}
