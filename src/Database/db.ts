import { categoryEntity } from 'src/Entity/catagory.entity';
import { todoEntity } from 'src/Entity/todo.entity';

export interface Database {
  category: categoryEntity[];
  todos: todoEntity[];
}

export const database: Database = {
  category: [],
  todos: [],
};
