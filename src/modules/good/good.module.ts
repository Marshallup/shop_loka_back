import { Module } from '@nestjs/common';
import { GoodController } from '@/controllers/good/good.controller';
import { GoodService } from '@/services/good/good.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from '@/database/entities/Good.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Good])],
  providers: [GoodService],
  controllers: [GoodController],
})
export class GoodModule {}
