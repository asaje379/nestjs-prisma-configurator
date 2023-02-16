import {
  DatabaseConfig,
  DatabaseConfigGenerator,
} from './../generators/db-config.gen';
import { InitArgs } from './init';
import { BaseCommand } from './index';
import { EnvParser } from '../parser/env';
import { existsSync } from 'fs';
import { createFile } from '../../utils';

export class DatabaseInitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    if (args.database) {
      const envParser = new EnvParser();
      const modes = Object.keys(args.database);

      for (const mode of modes) {
        const path = EnvParser.getPath(mode);
        if (!existsSync(path)) {
          createFile(path, '');
        }

        const currentData: Record<string, string> = envParser.parse({ path });

        const dabaseEnvUrl = new DatabaseConfigGenerator(
          args.database[mode] as DatabaseConfig,
        ).generate();

        currentData['DATABASE_URL'] = dabaseEnvUrl;
        createFile(path, envParser.unparse(currentData));
      }
    }
  }
}
