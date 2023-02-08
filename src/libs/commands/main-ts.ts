import { writeFileSync } from 'fs';
import { BaseCommand } from '.';
import { Format } from '../formatter';
import { MainDotTsGenerator } from '../generators/main-ts.gen';
import { InitArgs } from './init';

export class MainDotTsInitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    const content = new MainDotTsGenerator(args.server).generate();
    writeFileSync('src/main.ts', Format.ts(content), { encoding: 'utf-8' });
  }
}
