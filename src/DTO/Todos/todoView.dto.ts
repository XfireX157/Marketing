import { PartialType } from '@nestjs/mapped-types';
import { todoEntity } from 'src/Entity/todo.entity';

export class todoViewDTO extends PartialType(todoEntity) {}
