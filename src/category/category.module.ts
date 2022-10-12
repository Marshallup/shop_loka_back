import { CategoryController } from '@/category/category.controller';
import { Category } from '@/database/entities/Category.entity';
import { CategoryService } from '@/category/category.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
