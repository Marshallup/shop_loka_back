import { GoodService } from '@/services/good/good.service';
import { Controller, Get } from '@nestjs/common';

@Controller('good')
export class GoodController {
  constructor(private goodsService: GoodService) {}

  @Get()
  async test() {
    return this.goodsService.findAll();
  }
}
