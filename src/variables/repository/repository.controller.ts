export const repositoryController = `
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { ApiBody } from '@nestjs/swagger';
import { PaginationArgs } from 'nestjs-prisma-pagination';

@Controller('repository')
export class RepositoryController<CreateType, UpdateType> {
  constructor(
    private readonly repositoryService: RepositoryService<
      CreateType,
      UpdateType
    >,
  ) {}

  @Post()
  async create(@Body() createRepositoryDto: CreateType) {
    const result = await this.repositoryService.create(createRepositoryDto);
    return result;
  }

  @Post('multiple')
  async createMany(@Body() createRepositoryDtos: CreateType[]) {
    const result = await this.repositoryService.createMany(
      createRepositoryDtos,
    );
    return result;
  }

  @Get()
  async findAll(@Query() args?: PaginationArgs) {
    return await this.repositoryService.findAll(args);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.repositoryService.findOne(id);
    console.log(data);
    if (!data) return new NotFoundException();
    return data;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRepositoryDto: UpdateType,
  ) {
    const result = this.repositoryService.update(id, updateRepositoryDto);
    return result;
  }

  @Delete('multiple/force')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  async removeMultiple(@Body('ids') ids: string[]) {
    const result = await this.repositoryService.removeMultiple(ids);
    return result;
  }

  @Patch('multiple')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  async softRemoveMultiple(@Body('ids') ids: string[]) {
    console.log('[ids]', ids);
    const result = await this.repositoryService.softRemoveMultiple(ids);
    return result;
  }

  @Delete('all/force')
  async removeAll() {
    const result = await this.repositoryService.removeAll();
    return result;
  }

  @Delete('all')
  async softRemoveAll() {
    const result = await this.repositoryService.softRemoveAll();
    return result;
  }

  @Delete(':id/force')
  async remove(@Param('id') id: string) {
    const result = await this.repositoryService.remove(id);
    return result;
  }

  @Delete(':id')
  async softRemove(@Param('id') id: string) {
    const result = await this.repositoryService.softRemove(id);
    console.log(result);
    return result;
  }
}
`;
