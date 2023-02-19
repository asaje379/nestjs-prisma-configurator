import { Globals } from './../base/constants';
import { TodoService } from './todo.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller(Globals.VERSION + '/todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
}
