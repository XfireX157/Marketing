import { categoryEntity } from './catagory.entity';

export class todoEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  category: categoryEntity;
}
