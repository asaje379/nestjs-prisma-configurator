import { WebsocketModule } from './../websocket/websocket.module';
import { CrudModule } from './../crud/crud.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TodoCrudController } from './todo.crud.controller';

@Module({
  imports: [PrismaModule, CrudModule, WebsocketModule],
  controllers: [TodoController, TodoCrudController],
  providers: [TodoService],
})
export class TodoModule {}
