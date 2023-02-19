import { Globals } from './../base/constants';
import { AuthorService } from './author.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller(Globals.VERSION + '/authors')
@ApiTags('Authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
}
