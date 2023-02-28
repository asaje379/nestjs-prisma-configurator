import { kebabToCamel, lowerUpperVarName } from '../../../utils';

export function generateController(name: string) {
  const { upperName, lowerName } = lowerUpperVarName(name);
  const modelName =
    name.charAt(0).toLowerCase() + kebabToCamel(name).substring(1);
  return `
import { Globals } from './../base/constants';
import { ${upperName}Service } from './${lowerName}.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller(Globals.VERSION + '/${lowerName}s')
@ApiTags('${upperName}s')
export class ${upperName}Controller {
  constructor(private readonly ${modelName}Service: ${upperName}Service) {}
}
`;
}

export function generateCrudController(name: string) {
  const { upperName, lowerName } = lowerUpperVarName(name);
  const modelName =
    name.charAt(0).toLowerCase() + kebabToCamel(name).substring(1);
  return `
import { Globals } from './../base/constants';
import { ${upperName}Service } from './${lowerName}.service';
import { Helpers } from '../utils/helpers';
import { BasePagination } from '../base/pagination';
import { ApiResponseSchema } from '../base/schema';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Create${upperName} } from './dto/create-${lowerName}.dto';
import { Update${upperName} } from './dto/update-${lowerName}.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ${upperName}Serializer } from './serializers/${lowerName}.serializer';

@Controller(Globals.VERSION + '/${lowerName}s')
@ApiTags('${upperName}s')
export class ${upperName}CrudController {
  constructor(private readonly ${modelName}Service: ${upperName}Service) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ type: ${upperName}Serializer })
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  async create(@Body() create${upperName}: Create${upperName}) {
    return await this.${modelName}Service.create(create${upperName});
  }

  @Post('many')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: [Create${upperName}] })
  @ApiCreatedResponse({ type: [${upperName}Serializer] })
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  async createMany(@Body() create${upperName}s: Create${upperName}[]) {
    return await this.${modelName}Service.createMany(create${upperName}s);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: [${upperName}Serializer] })
  async findAll(@Query() args: BasePagination) {
    return await this.${modelName}Service.findAll(args);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: ${upperName}Serializer })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async findOne(@Param('id') id: string) {
    return await this.${modelName}Service.findOne(Helpers.numberOrString(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: ${upperName}Serializer })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async update(@Param('id') id: string, @Body() update${upperName}: Update${upperName}) {
    return await this.${modelName}Service.update(
      Helpers.numberOrString(id),
      update${upperName},
    );
  }

  @Delete('many')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: Array })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeMany(@Body() ids: string[]) {
    await this.${modelName}Service.archiveMany(
      ids.map((id) => Helpers.numberOrString(id)),
    );
    return { statusCode: HttpStatus.OK };
  }

  @Delete('many/force')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: Array })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeForceMany(@Body() ids: string[]) {
    await this.${modelName}Service.removeMany(
      ids.map((id) => Helpers.numberOrString(id)),
    );
    return { statusCode: HttpStatus.OK };
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async remove(@Param('id') id: string) {
    await this.${modelName}Service.archive(Helpers.numberOrString(id));
    return { statusCode: HttpStatus.OK };
  }

  @Delete(':id/force')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeForce(@Param('id') id: string) {
    await this.${modelName}Service.remove(Helpers.numberOrString(id));
    return { statusCode: HttpStatus.OK };
  }
}
`;
}
