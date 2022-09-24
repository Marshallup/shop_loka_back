import { CategoryService } from '@/services/category/category.service';
import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  constructor(private categoriesService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoriesService.findAll();
  }
}
