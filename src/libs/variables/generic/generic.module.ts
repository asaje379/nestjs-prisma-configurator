import { lowerUpperVarName } from '../../../utils';

export function generateModule(name: string) {
  const { upperName, lowerName } = lowerUpperVarName(name);
  return `
import { WebsocketModule } from './../websocket/websocket.module';
import { CrudModule } from './../crud/crud.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ${upperName}CrudController } from './${lowerName}.crud.controller';

@Module({
  imports: [PrismaModule, CrudModule, WebsocketModule],
  controllers: [${upperName}Controller, ${upperName}CrudController],
  providers: [${upperName}Service],
})
export class ${upperName}Module {}
`;
}
