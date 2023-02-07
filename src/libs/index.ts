import { DatabaseInitCommand } from './commands/db-init';
import { EnvInitCommand } from './commands/env-init';
import { Commander } from './commands/index';
import { MigrationScriptCommand } from './commands/migration-script';
import { YamlParser } from './parser/yaml';

export function bootstrap(path: string, cmd: string, target?: string) {
  console.log(`Parsing yml schema file at : ${path}...`);
  const $data = new YamlParser().parse(path);

  console.log($data);

  new DatabaseInitCommand().execute($data);
  new EnvInitCommand().execute($data);
  new MigrationScriptCommand().execute();

  // const enums = $data.enums;
  // const models = $data.models;

  // Commander.run(cmd, { models, enums, target });
}
