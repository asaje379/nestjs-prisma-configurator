import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAuthor {
  @ApiPropertyOptional()
  name?: string;
}
