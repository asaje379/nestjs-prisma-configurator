import { BaseCommand } from '.';
import { BaseGenerator } from '../generators/base.gen';

export class BaseInitCommand implements BaseCommand {
  execute(): void {
    new BaseGenerator().generate();
  }
}
