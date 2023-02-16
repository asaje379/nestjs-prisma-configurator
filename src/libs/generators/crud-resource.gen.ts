import { crudModule } from '../variables/crud/crud.module';
import { crudService } from '../variables/crud/crud.service';
import { NestResourceGenerator } from './nest-resource.gen';

export class CrudResGenerator extends NestResourceGenerator {
  constructor() {
    super({
      path: 'crud',
      data: {
        module: crudModule,
        service: crudService,
      },
    });
  }
}
