import { lowerUpperVarName } from '..';
import { kebabToCamel } from '../../utils';

export function generateController(name: string) {
  const { upperName, lowerName } = lowerUpperVarName(name);
  const modelName =
    name.charAt(0).toLowerCase() + kebabToCamel(name).substring(1);
  return `
import { Create${upperName}, Update${upperName} } from './${lowerName}.typings';
import { RepositoryController } from './../repository/repository.controller';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ${upperName}Service } from './${lowerName}.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('${lowerName}s')
@ApiTags('Manage ${lowerName}s')
export class ${upperName}Controller extends RepositoryController<
  Create${upperName},
  Update${upperName}
> {
  constructor(private readonly ${modelName}Service: ${upperName}Service) {
    super(${modelName}Service);
  }

  @Post()
  async create(@Body() data: Create${upperName}) {
    return await this.${modelName}Service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Update${upperName}) {
    return await this.${modelName}Service.update(id, data);
  }
}`;
}
