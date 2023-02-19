import { ApiPropertyOptional } from '@nestjs/swagger';
import { TodoStatus } from '@prisma/client';
import {
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsEnum,
} from 'class-validator';

export class UpdateTodo {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @ApiPropertyOptional()
  label?: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiPropertyOptional()
  duration?: number;

  @IsEnum(TodoStatus)
  @ApiPropertyOptional({ enum: TodoStatus })
  status?: TodoStatus;

  @ApiPropertyOptional() authorId: string;
}
