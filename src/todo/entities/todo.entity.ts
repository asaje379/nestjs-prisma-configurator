import { BaseEntity } from '../../base/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

import { TodoStatus, Author } from '@prisma/client';
export class Todo extends BaseEntity {
  @ApiResponseProperty() id: string;
  @ApiResponseProperty() label: string;
  @ApiResponseProperty() duration: number;
  @ApiResponseProperty() status: TodoStatus;
  @ApiResponseProperty() authorId: string;
  @ApiResponseProperty() author: Author;
  @ApiResponseProperty() createdAt: Date;
  @ApiResponseProperty() updatedAt: Date;
  enabled: boolean;
}
