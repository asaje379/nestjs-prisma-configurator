export const repositoryModule = `
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService, PrismaModule],
  imports: [],
})
export class RepositoryModule {}`;
