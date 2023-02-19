import { BaseEntity } from '../../base/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

export class Author extends BaseEntity {
  @ApiResponseProperty() id: string;
  @ApiResponseProperty() name: string;
  @ApiResponseProperty() createdAt: Date;
  @ApiResponseProperty() updatedAt: Date;
  enabled: boolean;
}
