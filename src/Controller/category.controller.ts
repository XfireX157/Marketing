import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDTO } from 'src/DTO/Category/Category.dto';
import { Roles } from 'src/Decorator/roles.decorator';
import { Role } from 'src/Entity/role.enum';
import { AuthGuard } from 'src/Guards/jwt.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { CategoryService } from 'src/Service/category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(): Promise<CategoryDTO[]> {
    return this.categoryService.getAll();
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard)
  @Get(':id')
  getIdCategory(@Param('id') id: string): Promise<CategoryDTO> {
    return this.categoryService.getID(id);
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  createCategory(@Body() categoryTodo: CategoryDTO) {
    return this.categoryService.createCategory(categoryTodo);
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  deleteCategory(@Param() id: string): Promise<CategoryDTO> {
    return this.categoryService.deleteCategoryId(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() category: CategoryDTO,
  ): Promise<CategoryDTO> {
    return this.categoryService.updateCategoryId(id, category);
  }
}
