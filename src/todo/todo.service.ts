import { WebsocketGateway } from './../websocket/websocket.gateway';
import { TodoSerializer } from './serializers/todo.serializer';
import { PrismaService } from './../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateTodo } from './dto/update-todo.dto';
import { CreateTodo } from './dto/create-todo.dto';
import { CrudService } from './../crud/crud.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService extends CrudService<
  CreateTodo,
  UpdateTodo,
  Prisma.TodoWhereInput
> {
  constructor(
    protected prisma: PrismaService,
    protected socket: WebsocketGateway
  ) {
    super(prisma, socket);
    this.model = 'todo';
    this.defaultSerializer = TodoSerializer;
  }
}
