import { Module } from '@nestjs/common';
import { TodoController } from 'src/Controller/todo.controller';
import { CategoryService } from 'src/Service/category.service';
import { TodoService } from 'src/Service/todo.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService, CategoryService],
})
export class TodoModule {}
