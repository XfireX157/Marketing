import { Injectable } from '@nestjs/common';
import { CategoryDTO } from 'src/DTO/Category/category.dto';
import { categoryViewDTO } from 'src/DTO/Category/categoryView.dto';
import { updateCategoryDTO } from 'src/DTO/Category/updateCategory.dto';
import { database } from 'src/Database/db';
import { categoryEntity } from 'src/Entity/catagory.entity';
import { ForbiddenException } from 'src/Exception/forbidden.exception';

@Injectable()
export class CategoryService {
  async generateID(): Promise<string> {
    var numRandom = Math.floor(Math.random() * 9999);
    var idAleatorio = numRandom.toString();
    return idAleatorio;
  }

  async getAll(): Promise<categoryViewDTO[]> {
    if (database.category.length === 0) {
      throw new ForbiddenException('Não tem nenhum category criado', 204);
    }
    return database.category;
  }

  async findName(name: string): Promise<categoryEntity> {
    const findName = database.category.find((item) => item.name === name);
    if (!findName) {
      throw new ForbiddenException(
        'Não existe nenhum category com esse nome',
        404,
      );
    }
    return findName;
  }

  async getID(id: string): Promise<categoryViewDTO> {
    const getID = database.category.find((item) => item.id === id);
    if (!getID) {
      throw new ForbiddenException(
        'Não existe nenhum category com esse id',
        404,
      );
    }
    return getID;
  }

  async createCategory(createCategory: CategoryDTO) {
    createCategory.id = await this.generateID();
    database.category.push(createCategory);
    return createCategory;
  }

  async updateCategoryId(
    id: string,
    category: updateCategoryDTO,
  ): Promise<updateCategoryDTO> {
    const categoryId = await this.getID(id);
    Object.assign(categoryId, category);
    return category;
  }

  async deleteCategoryId(id: string): Promise<categoryViewDTO> {
    const categoryId = await this.getID(id);
    const index = database.category.findIndex((item) => item.id === id);
    database.category.splice(index, 1);
    return categoryId;
  }
}
