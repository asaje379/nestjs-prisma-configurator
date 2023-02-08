import { prismaModule } from '../variables/prisma/prisma.module';
import { prismaService } from '../variables/prisma/prisma.service';
import { NestResourceGenerator } from './nest-resource.gen';

export class PrismaResGenerator extends NestResourceGenerator {
  constructor() {
    super({
      path: 'prisma',
      data: { module: prismaModule, service: prismaService },
    });
  }
}
