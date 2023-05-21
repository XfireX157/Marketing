import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { todoDto } from 'src/DTO/Todos/todo.dto';
import { updateTodo } from 'src/DTO/Todos/updateTodo.dto';
import { TodoService } from 'src/Service/todo.service';
import { AuthGuard } from 'src/Service/jwt.service';
import { HttpExceptionFilter } from 'src/Exception/http-exception.filter';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAll(): Promise<todoDto[]> {
    return this.todoService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  getIdTodo(@Param('id') id: string): Promise<todoDto> {
    return this.todoService.getID(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createTodo(@Body() todo: todoDto) {
    return this.todoService.createTodo(todo);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  deleteTodo(@Param('id') id: string): Promise<todoDto> {
    return this.todoService.deleteID(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseFilters(HttpExceptionFilter)
  updateID(
    @Param('id') id: string,
    @Body() todos: updateTodo,
  ): Promise<updateTodo> {
    return this.todoService.updateID(id, todos);
  }
}
