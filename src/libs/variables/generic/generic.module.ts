import { lowerUpperVarName } from '../../../utils';

export function generateModule(name: string) {
  const { upperName } = lowerUpperVarName(name);
  return `
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [${upperName}Controller],
  providers: [${upperName}Service],
})
export class ${upperName}Module {}
`;
}
