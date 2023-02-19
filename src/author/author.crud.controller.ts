import { Globals } from './../base/constants';
import { AuthorService } from './author.service';
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
import { CreateAuthor } from './dto/create-author.dto';
import { UpdateAuthor } from './dto/update-author.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorSerializer } from './serializers/author.serializer';

@Controller(Globals.VERSION + '/authors')
@ApiTags('Authors')
export class AuthorCrudController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ type: AuthorSerializer })
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  async create(@Body() createAuthor: CreateAuthor) {
    return await this.authorService.create(createAuthor);
  }

  @Post('many')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: [CreateAuthor] })
  @ApiCreatedResponse({ type: [AuthorSerializer] })
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  async createMany(@Body() createAuthors: CreateAuthor[]) {
    return await this.authorService.createMany(createAuthors);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: [AuthorSerializer] })
  async findAll(@Query() args: BasePagination) {
    return await this.authorService.findAll(args);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: AuthorSerializer })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(Helpers.numberOrString(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: AuthorSerializer })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBadRequestResponse(ApiResponseSchema.get(HttpStatus.BAD_REQUEST))
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async update(@Param('id') id: string, @Body() updateAuthor: UpdateAuthor) {
    return await this.authorService.update(
      Helpers.numberOrString(id),
      updateAuthor
    );
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async remove(@Param('id') id: string) {
    await this.authorService.archive(Helpers.numberOrString(id));
    return { statusCode: HttpStatus.OK };
  }

  @Delete(':id/force')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeForce(@Param('id') id: string) {
    await this.authorService.remove(Helpers.numberOrString(id));
    return { statusCode: HttpStatus.OK };
  }

  @Delete('many')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: Array })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeMany(@Body() ids: string[]) {
    await this.authorService.archiveMany(
      ids.map((id) => Helpers.numberOrString(id))
    );
    return { statusCode: HttpStatus.OK };
  }

  @Delete('many/force')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: Array })
  @ApiNotFoundResponse(ApiResponseSchema.get(HttpStatus.NOT_FOUND))
  async removeForceMany(@Body() ids: string[]) {
    await this.authorService.removeMany(
      ids.map((id) => Helpers.numberOrString(id))
    );
    return { statusCode: HttpStatus.OK };
  }
}
