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
import { CategoryDTO } from 'src/DTO/Category/category.dto';
import { categoryViewDTO } from 'src/DTO/Category/categoryView.dto';
import { updateCategoryDTO } from 'src/DTO/Category/updateCategory.dto';
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
  getAll(): Promise<categoryViewDTO[]> {
    return this.categoryService.getAll();
  }

  @Get('getName/:name')
  getNameCategory(@Param('name') name: string): Promise<categoryViewDTO> {
    return this.categoryService.findName(name);
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('getId/:id')
  getIdCategory(@Param('id') id: string): Promise<categoryViewDTO> {
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
  deleteCategory(@Param('id') id: string): Promise<categoryViewDTO> {
    return this.categoryService.deleteCategoryId(id);
  }

  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() category: updateCategoryDTO,
  ): Promise<updateCategoryDTO> {
    return this.categoryService.updateCategoryId(id, category);
  }
}
