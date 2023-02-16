import { kebabToCamel, lowerUpperVarName } from '../../../utils';

export function generateService(name: string) {
  const { upperName, lowerName } = lowerUpperVarName(name);
  const modelName =
    name.charAt(0).toLowerCase() + kebabToCamel(name).substring(1);

  return `
import { WebsocketGateway } from './../websocket/websocket.gateway';
import { ${upperName}Serializer } from './serializers/${lowerName}.serializer';
import { PrismaService } from './../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Update${upperName} } from './dto/update-${lowerName}.dto';
import { Create${upperName} } from './dto/create-${lowerName}.dto';
import { CrudService } from './../crud/crud.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${upperName}Service extends CrudService<
  Create${upperName},
  Update${upperName},
  Prisma.${upperName}WhereInput
> {
  constructor(
    protected prisma: PrismaService,
    protected socket: WebsocketGateway,
  ) {
    super(prisma, socket);
    this.model = '${modelName}';
    this.defaultSerializer = ${upperName}Serializer;
  }
}
`;
}
