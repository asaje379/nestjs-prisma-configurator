import { repositoryController } from '../../variables/repository/repository.controller';
import { repositoryModule } from '../../variables/repository/repository.module';
import { repositoryService } from '../../variables/repository/repository.service';
import { NestResourceGenerator } from './nest-resource.gen';

export class RepositoryResGenerator extends NestResourceGenerator {
  constructor() {
    super({
      path: 'repository',
      data: {
        module: repositoryModule,
        service: repositoryService,
        controller: repositoryController,
      },
    });
  }
}
