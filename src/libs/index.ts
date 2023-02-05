import { Commander } from './commands/index';
import { parseYml } from '../utils/parser';

export function bootstrap(path: string, cmd: string, target?: string) {
  console.log(`Parsing yml schema file at : ${path}...`);
  const $data = parseYml(path);

  const enums = $data.enums;
  const models = $data.models;

  Commander.run(cmd, { models, enums, target });
}
