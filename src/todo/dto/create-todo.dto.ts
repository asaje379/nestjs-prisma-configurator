import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateTodo {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @ApiProperty()
  label: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty()
  duration: number;

  @IsEnum(TodoStatus)
  @ApiProperty({ enum: TodoStatus })
  status: TodoStatus;

  @ApiProperty() authorId: string;
}
