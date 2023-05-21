import { NotFoundException, Injectable } from '@nestjs/common';
import { ForbiddenException } from 'src/Exception/forbidden.exception';
import { updateTodo } from 'src/DTO/Todos/updateTodo.dto';
import { todoEntity } from 'src/Entity/todo.entity';

@Injectable()
export class TodoService {
  private readonly todos: todoEntity[] = [];

  async generateID(): Promise<string> {
    var numRandom = Math.floor(Math.random() * 9999);
    var idAleatorio = numRandom.toString();
    return idAleatorio;
  }

  async getAll(): Promise<todoEntity[]> {
    if (this.todos.length === 0) {
      throw new ForbiddenException('Não tem nenhum todo criado', 404);
    }
    return this.todos;
  }

  async getID(id: string): Promise<todoEntity> {
    const getId = this.todos.find((item) => item.id === id);
    if (!getId) {
      throw new NotFoundException('Não existe nenhum todo com esse ID');
    }
    return getId;
  }

  async createTodo(todo: todoEntity) {
    todo.id = await this.generateID();
    this.todos.push(todo);
    return todo;
  }

  async deleteID(id: string): Promise<todoEntity> {
    const taskArray = await this.getID(id);
    if (!taskArray) {
      throw new NotFoundException('Não existe nenhum todo com esse ID');
    }
    const index = this.todos.findIndex((value) => value.id === id);
    this.todos.splice(index, 1);
    return taskArray;
  }

  async updateID(id: string, task: updateTodo): Promise<updateTodo> {
    const taskArray = await this.getID(id);
    if (!taskArray) {
      throw new NotFoundException('Não existe nenhum todo com esse ID');
    } else if (taskArray) {
      Object.assign(taskArray, task);
    }
    return taskArray;
  }
}
