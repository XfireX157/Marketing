import { PartialType } from '@nestjs/mapped-types';
import { CategoryDTO } from './category.dto';

export class updateCategoryDTO extends PartialType(CategoryDTO) {}
