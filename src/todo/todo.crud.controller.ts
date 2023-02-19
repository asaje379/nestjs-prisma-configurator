import { Globals } from './../base/constants';
import { TodoService } from './todo.service';
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
import { CreateTodo } from './dto/create-todo.dto';
import { UpdateTodo } from './dto/update-todo.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TodoSerializer } from './serializers/todo.serializer';

@Controller(Globals.VERSION + '/todos')
@ApiTags('Todos')
export class TodoCrudController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ type: TodoSerializer })
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  async create(@Body() createTodo: CreateTodo) {
    return await this.todoService.create(createTodo);
  }

  @Post('many')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: [CreateTodo] })
  @ApiCreatedResponse({ type: [TodoSerializer] })
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  async createMany(@Body() createTodos: CreateTodo[]) {
    return await this.todoService.createMany(createTodos);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: [TodoSerializer] })
  async findAll(@Query() args: BasePagination) {
    return await this.todoService.findAll(args);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: TodoSerializer })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(Helpers.numberOrString(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: TodoSerializer })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async update(@Param('id') id: string, @Body() updateTodo: UpdateTodo) {
    return await this.todoService.update(
      Helpers.numberOrString(id),
      updateTodo
    );
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async remove(@Param('id') id: string) {
    await this.todoService.archive(Helpers.numberOrString(id));
    return { statusCode: HttpStatus.OK };
  }

  @Delete(':id/force')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeForce(@Param('id') id: string) {
    await this.todoService.remove(Helpers.numberOrString(id));
    return { statusCode: HttpStatus.OK };
  }

  @Delete('many')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: Array })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeMany(@Body() ids: string[]) {
    await this.todoService.archiveMany(
      ids.map((id) => Helpers.numberOrString(id))
    );
    return { statusCode: HttpStatus.OK };
  }

  @Delete('many/force')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: Array })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeForceMany(@Body() ids: string[]) {
    await this.todoService.removeMany(
      ids.map((id) => Helpers.numberOrString(id))
    );
    return { statusCode: HttpStatus.OK };
  }
}
