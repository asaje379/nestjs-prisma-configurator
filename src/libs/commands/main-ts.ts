import { BaseCommand } from '.';
import { createFile } from '../../utils';
import { Format } from '../formatter';
import { MainDotTsGenerator } from '../generators/main-ts.gen';
import { InitArgs } from './init';

export class MainDotTsInitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    const content = new MainDotTsGenerator(args.server).generate();
    createFile('src/main.ts', Format.ts(content));
  }
}
