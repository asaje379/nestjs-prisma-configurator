import { InitArgs } from './init';
import { BaseCommand } from './index';
import { EnvParser } from '../parser/env';
import { existsSync, writeFileSync } from 'fs';

export class EnvInitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    const envParser = new EnvParser();
    const modes = Object.keys(args.env);

    for (const mode of modes) {
      const path = EnvParser.getPath(mode);
      if (!existsSync(path)) {
        writeFileSync(path, '', 'utf-8');
      }

      const currentData: Record<string, string> = envParser.parse({ path });

      writeFileSync(
        path,
        envParser.unparse({
          ...currentData,
          ...(args.env[mode] as Record<string, string | number>),
        }),
        'utf-8',
      );
    }
  }
}
