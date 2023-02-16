export const crudModule = `
import { WebsocketModule } from '../websocket/websocket.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  providers: [CrudService],
  imports: [PrismaModule, WebsocketModule],
  exports: [CrudService],
})
export class CrudModule {}
`;
