import { Exclude } from 'class-transformer';
import { Todo } from '../entities/todo.entity';

export class TodoSerializer extends Todo {
  @Exclude() enabled: boolean;
}
