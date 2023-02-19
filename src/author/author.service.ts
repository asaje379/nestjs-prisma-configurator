import { WebsocketGateway } from './../websocket/websocket.gateway';
import { AuthorSerializer } from './serializers/author.serializer';
import { PrismaService } from './../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateAuthor } from './dto/update-author.dto';
import { CreateAuthor } from './dto/create-author.dto';
import { CrudService } from './../crud/crud.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService extends CrudService<
  CreateAuthor,
  UpdateAuthor,
  Prisma.AuthorWhereInput
> {
  constructor(
    protected prisma: PrismaService,
    protected socket: WebsocketGateway
  ) {
    super(prisma, socket);
    this.model = 'author';
    this.defaultSerializer = AuthorSerializer;
  }
}
