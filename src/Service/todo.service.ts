import { Injectable } from '@nestjs/common';
import { ForbiddenException } from 'src/Exception/forbidden.exception';
import { updateTodoDTO } from 'src/DTO/Todos/updateTodo.dto';
import { todoEntity } from 'src/Entity/todo.entity';
import { CategoryService } from './category.service';
import { todoDto } from 'src/DTO/Todos/todo.dto';
import { database } from 'src/Database/db';
import { todoViewDTO } from 'src/DTO/Todos/todoView.dto';

@Injectable()
export class TodoService {
  constructor(private categoryServices: CategoryService) {}

  async generateID(): Promise<string> {
    var numRandom = Math.floor(Math.random() * 9999);
    var idAleatorio = numRandom.toString();
    return idAleatorio;
  }

  async getAll(): Promise<todoViewDTO[]> {
    if (database.todos.length === 0) {
      throw new ForbiddenException('Não tem nenhum todo criado', 204);
    }
    return database.todos;
  }

  async getID(id: string): Promise<todoViewDTO> {
    const getId = database.todos.find((item) => item.id === id);
    if (!getId) {
      throw new ForbiddenException('Não tem nenhum todo com esse Id', 404);
    }
    return getId;
  }

  async createTodo(todo: todoDto) {
    const todoDto: todoEntity = {
      id: await this.generateID(),
      name: todo.name,
      description: todo.description,
      price: todo.price,
      category: await this.categoryServices.findName(todo.categoryName),
    };
    database.todos.push(todoDto);
    return todo;
  }

  async deleteID(id: string): Promise<todoViewDTO> {
    const taskArray = await this.getID(id);
    const index = database.todos.findIndex((value) => value.id === id);
    database.todos.splice(index, 1);
    return taskArray;
  }

  async updateID(id: string, task: updateTodoDTO): Promise<updateTodoDTO> {
    const taskArray = await this.getID(id);
    Object.assign(taskArray, task);
    return task;
  }
}
