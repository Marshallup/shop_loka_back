import { Module } from '@nestjs/common';
import { GoodController } from '@/controllers/good/good.controller';
import { GoodService } from '@/services/good/good.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from '@/database/entities/Good.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Good]), ImageModule],
  providers: [GoodService],
  controllers: [GoodController],
})
export class GoodModule {}
