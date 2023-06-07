import { Module } from '@nestjs/common';
import { CategoryController } from 'src/Controller/category.controller';
import { CategoryService } from 'src/Service/category.service';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
