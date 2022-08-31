import { Good } from '@/database/entities/Good.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
