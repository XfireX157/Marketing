import { Module } from '@nestjs/common';
import { TodoController } from 'src/Controller/todo.controller';
import { TodoService } from 'src/Service/todo.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
