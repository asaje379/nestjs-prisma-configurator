import { Commander } from './commands';
import { InitArgs } from './commands/init';
import { YamlParser } from './parser/yaml';

export function bootstrap(path: string, cmd: string, target?: string) {
  console.log(`Parsing yml schema file at : ${path}...`);
  const data = new YamlParser().parse(path) as Omit<InitArgs, 'target'>;

  Commander.run(cmd, { ...data, target });
}
