import { WebsocketModule } from './../websocket/websocket.module';
import { CrudModule } from './../crud/crud.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthorCrudController } from './author.crud.controller';

@Module({
  imports: [PrismaModule, CrudModule, WebsocketModule],
  controllers: [AuthorController, AuthorCrudController],
  providers: [AuthorService],
})
export class AuthorModule {}
