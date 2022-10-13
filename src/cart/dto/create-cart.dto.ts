import { Good } from '@/database/entities/Good.entity';

export class CreateCartDto {
  goodsID: Good['id'][];
}
