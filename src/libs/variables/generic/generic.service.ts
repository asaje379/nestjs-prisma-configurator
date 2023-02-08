import { kebabToCamel, lowerUpperVarName } from '../../../utils';

export function generateService(name: string) {
  const { upperName, lowerName } = lowerUpperVarName(name);
  const modelName =
    name.charAt(0).toLowerCase() + kebabToCamel(name).substring(1);

  return `
import { Create${upperName}, Update${upperName} } from './${lowerName}.typings';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoryService } from './../repository/repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${upperName}Service extends RepositoryService<
  Create${upperName},
  Update${upperName}
> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
    this.model = '${modelName}';
    this.includes = [];
  }
}`;
}
