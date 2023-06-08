import { PartialType } from '@nestjs/mapped-types';
import { categoryEntity } from 'src/Entity/catagory.entity';

export class categoryViewDTO extends PartialType(categoryEntity) {}
