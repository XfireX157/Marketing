import { PartialType } from '@nestjs/mapped-types';
import { todoDto } from './todo.dto';

export class updateTodo extends PartialType(todoDto) {}
