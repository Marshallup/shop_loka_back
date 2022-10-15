import { Good } from '@/database/entities/Good.entity';

export class CreateCartDto {
  goods: {
    count: number;
    goods: Good['id'];
  }[];
}
