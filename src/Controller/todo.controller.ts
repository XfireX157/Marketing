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
import { updateTodoDTO } from 'src/DTO/Todos/updateTodo.dto';
import { TodoService } from 'src/Service/todo.service';
import { AuthGuard } from 'src/Guards/jwt.guard';
import { HttpExceptionFilter } from 'src/Exception/http-exception.filter';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Role } from 'src/Entity/role.enum';
import { Roles } from 'src/Decorator/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { todoViewDTO } from 'src/DTO/Todos/todoView.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAll(): Promise<todoViewDTO[]> {
    return this.todoService.getAll();
  }

  @UseGuards(AuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  getIdTodo(@Param('id') id: string): Promise<todoViewDTO> {
    return this.todoService.getID(id);
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  createTodo(@Body() todo: todoDto) {
    return this.todoService.createTodo(todo);
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  deleteTodo(@Param('id') id: string): Promise<todoViewDTO> {
    return this.todoService.deleteID(id);
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @UseFilters(HttpExceptionFilter)
  updateID(
    @Param('id') id: string,
    @Body() todos: updateTodoDTO,
  ): Promise<updateTodoDTO> {
    return this.todoService.updateID(id, todos);
  }
}
