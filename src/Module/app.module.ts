import { Module } from '@nestjs/common';
import { TodoModule } from './todo.module';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
