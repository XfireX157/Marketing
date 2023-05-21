import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { userDto, userLoginDto } from 'src/DTO/user.dto';

@Controller('user')
export class userController {
  constructor(private readonly userServices: UserService) {}

  @Get()
  getAllUser(): Promise<userDto[]> {
    return this.userServices.getAllUser();
  }

  @Get(':id')
  getIdUser(@Param('id') id: string): Promise<userDto> {
    return this.userServices.getId(id);
  }

  @Post('login')
  async loginUser(@Body() loginDto: userLoginDto) {
    return await this.userServices.singIn(loginDto);
  }

  @Post('register')
  createUser(@Body() userTodo: userDto) {
    return this.userServices.createUser(userTodo);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<userDto> {
    return this.userServices.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userTodo: userDto,
  ): Promise<userDto> {
    return this.userServices.updateUser(id, userTodo);
  }
}
