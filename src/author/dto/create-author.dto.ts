import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthor {
  @ApiProperty()
  name: string;
}
