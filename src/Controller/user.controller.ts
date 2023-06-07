import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { userRegisterDto } from 'src/DTO/User/userRegister.dto';
import { userLoginDto } from 'src/DTO/User/userLogin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class userController {
  constructor(private readonly userServices: UserService) {}

  @Get(':id')
  getIdUser(@Param('id') id: string): Promise<userRegisterDto> {
    return this.userServices.getId(id);
  }

  @Post('login')
  async loginUser(@Body() loginDto: userLoginDto) {
    return await this.userServices.singIn(loginDto);
  }

  @Post('register')
  createUser(@Body() userTodo: userRegisterDto) {
    return this.userServices.register(userTodo);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.userServices.forgetPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    return this.userServices.resetPassword(token, password);
  }
}
