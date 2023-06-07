import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userEntity } from 'src/Entity/user.entity';
import { ForbiddenException } from 'src/Exception/forbidden.exception';
import { userLoginDto } from 'src/DTO/User/userLogin.dto';
import { userRegisterDto } from 'src/DTO/User/userRegister.dto';
import { createHash, randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';
import { PasswordResetToken } from 'src/DTO/User/PasswordResetToken';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private EmailServices: EmailService,
  ) {}
  private readonly userTodo: userEntity[] = [];
  private readonly tokenArray: PasswordResetToken[] = [];

  async generateID(): Promise<string> {
    var numRandom = Math.floor(Math.random() * 9999);
    var idAleatorio = numRandom.toString();
    return idAleatorio;
  }

  async generateHashRandom(): Promise<string> {
    const randomBytesBuffer = randomBytes(16);
    const hash = createHash('sha256').update(randomBytesBuffer).digest('hex');
    return hash;
  }

  async getId(id: string): Promise<userEntity> {
    const getId = this.userTodo.find((item) => item.id === id);
    if (!getId) {
      throw new ForbiddenException('Esse usuario não existe', 404);
    }
    return getId;
  }

  async findOne(email: string): Promise<userEntity> | undefined {
    const getEmail = this.userTodo.find((item) => item.email === email);
    if (!getEmail) {
      throw new ForbiddenException('Esse usuario não existe', 404);
    }
    return getEmail;
  }

  async register(userTodos: userRegisterDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userTodos.password, saltOrRounds);
    userTodos.password = hash;
    userTodos.id = await this.generateID();
    this.userTodo.push(userTodos);
    return userTodos;
  }

  async singIn(users: userLoginDto) {
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

  async forgetPassword(email: string) {
    await this.findOne(email);
    const token = await this.generateHashRandom();

    this.tokenArray.push({
      email,
      token,
      tokenExpire: new Date(Date.now() + 3600),
    });

    await this.EmailServices.sendMail(
      email,
      'Redefinição da sua senha',
      `Verifique sua conta, com essa token: ${token}`,
    );

    return {
      message:
        'Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail',
    };
  }

  async resetPassword(token: string, password: string) {
    const tokenData = this.tokenArray.find((item) => item.token === token);
    const user = this.userTodo.find((item) => item.email === tokenData.email);

    if (!tokenData) {
      throw new ForbiddenException('Token de redefinição de senha inválido');
    }

    if (!user) {
      throw new ForbiddenException('Usuário não encontrado');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;

    const tokenIndex = this.tokenArray.findIndex(
      (item) => item.token === token,
    );
    if (tokenIndex !== -1) {
      this.tokenArray.splice(tokenIndex, 1);
    }

    return { message: 'Senha redefomoda com sucesso' };
  }
}
