import { Injectable, NotFoundException } from '@nestjs/common';
import { categoryEntity } from 'src/Entity/catagory.entity';
import { ForbiddenException } from 'src/Exception/forbidden.exception';

@Injectable()
export class CategoryService {
  private readonly category: categoryEntity[] = [];

  async generateID(): Promise<string> {
    var numRandom = Math.floor(Math.random() * 9999);
    var idAleatorio = numRandom.toString();
    return idAleatorio;
  }

  async getAll(): Promise<categoryEntity[]> {
    if (this.category.length === 0) {
      throw new ForbiddenException('Não tem nenhum category criado', 404);
    }
    return this.category;
  }

  async getID(id: string): Promise<categoryEntity> {
    const getId = this.category.find((item) => item.id === id);
    if (!getId) {
      throw new NotFoundException('Não existe nenhum category com esse ID');
    }
    return getId;
  }

  async createCategory(createCategory: categoryEntity) {
    createCategory.id = await this.generateID();
    this.category.push(createCategory);
    return createCategory;
  }

  async updateCategoryId(
    id: string,
    category: categoryEntity,
  ): Promise<categoryEntity> {
    const categoryId = await this.getID(id);
    if (!categoryId) {
      throw new ForbiddenException('Não tem nenhum category com esse id', 404);
    }

    Object.assign(categoryId, category);
    return category;
  }

  async deleteCategoryId(id: string): Promise<categoryEntity> {
    const categoryId = await this.getID(id);
    if (!categoryId) {
      throw new ForbiddenException('Não tem nenhum category com esse id', 404);
    }
    const index = this.category.findIndex((item) => item.id === id);
    this.category.splice(index, 1);

    return categoryId;
  }
}
