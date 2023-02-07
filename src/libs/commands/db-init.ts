import {
  DatabaseConfig,
  DatabaseConfigGenerator,
} from './../generators/db-config.gen';
import { InitArgs } from './init';
import { BaseCommand } from './index';
import { EnvParser } from '../parser/env';
import { existsSync, writeFileSync } from 'fs';

export class DatabaseInitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    const envParser = new EnvParser();
    const modes = Object.keys(args.database);

    for (const mode of modes) {
      const path = EnvParser.getPath(mode);
      if (!existsSync(path)) {
        writeFileSync(path, '', 'utf-8');
      }

      const currentData: Record<string, string> = envParser.parse({ path });

      const dabaseEnvUrl = new DatabaseConfigGenerator(
        args.database[mode] as DatabaseConfig,
      ).generate();

      currentData['DATABASE_URL'] = dabaseEnvUrl;
      writeFileSync(path, envParser.unparse(currentData), 'utf-8');
    }
  }
}
