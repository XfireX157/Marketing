import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userEntity } from 'src/Entity/user.entity';
import { ForbiddenException } from 'src/Exception/forbidden.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  private readonly userTodo: userEntity[] = [];

  async generateID(): Promise<string> {
    var numRandom = Math.floor(Math.random() * 9999);
    var idAleatorio = numRandom.toString();
    return idAleatorio;
  }

  async getAllUser(): Promise<userEntity[]> {
    if (this.userTodo.length === 0) {
      throw new ForbiddenException('Não tem nenhum todo criado', 404);
    }
    return this.userTodo;
  }

  async getId(id: string): Promise<userEntity> {
    const getId = this.userTodo.find((item) => item.id === id);
    if (!getId) {
      throw new NotFoundException('Esse usuario não existe');
    }
    return getId;
  }

  async findOne(email: string): Promise<userEntity> | undefined {
    const getEmail = this.userTodo.find((item) => item.email === email);
    if (!getEmail) {
      throw new UnauthorizedException();
    }
    return getEmail;
  }

  async createUser(userTodos: userEntity) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userTodos.password, saltOrRounds);
    userTodos.password = hash;
    userTodos.id = await this.generateID();
    this.userTodo.push(userTodos);
    return userTodos;
  }

  async singIn(users: userEntity) {
    const user = await this.findOne(users.email);
    const isPasswordValid = await bcrypt.compare(users.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
      password: user.password,
      roles: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async deleteUser(id: string): Promise<userEntity> {
    const userArray = await this.getId(id);
    if (!userArray) {
      throw new NotFoundException('Esse usuario não existe');
    }
    const index = this.userTodo.findIndex((item) => item.id === id);
    this.userTodo.splice(index, 1);
    return userArray;
  }

  async updateUser(id: string, userTodos: userEntity): Promise<userEntity> {
    const userArray = await this.getId(id);
    if (!userArray) {
      throw new NotFoundException('Esse usuario não existe');
    }
    if (userArray) {
      userArray.name = userTodos.name;
      userArray.email = userTodos.email;
      userArray.password = userTodos.password;
    }
    return userArray;
  }
}
