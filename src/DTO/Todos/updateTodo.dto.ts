import { PartialType } from '@nestjs/mapped-types';
import { todoDto } from './todo.dto';

export class updateTodoDTO extends PartialType(todoDto) {}
