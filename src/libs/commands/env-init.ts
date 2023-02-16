import { InitArgs } from './init';
import { BaseCommand } from './index';
import { EnvParser } from '../parser/env';
import { existsSync } from 'fs';
import { createFile } from '../../utils';

export class EnvInitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    if (args.env) {
      const envParser = new EnvParser();
      const modes = Object.keys(args.env);

      for (const mode of modes) {
        const path = EnvParser.getPath(mode);
        if (!existsSync(path)) {
          createFile(path, '');
        }

        const currentData: Record<string, string> = envParser.parse({ path });

        createFile(
          path,
          envParser.unparse({
            ...currentData,
            ...(args.env[mode] as Record<string, string | number>),
          }),
        );
      }
    }
  }
}
