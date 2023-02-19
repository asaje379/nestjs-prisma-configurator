import { Exclude } from 'class-transformer';
import { Author } from '../entities/author.entity';

export class AuthorSerializer extends Author {
  @Exclude() enabled: boolean;
}
