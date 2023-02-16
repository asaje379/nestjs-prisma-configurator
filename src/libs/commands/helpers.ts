import { BaseCommand } from '.';
import { HelpersGenerator } from '../generators/helpers.gen';

export class HelpersCommand implements BaseCommand {
  execute() {
    new HelpersGenerator().generate();
  }
}
