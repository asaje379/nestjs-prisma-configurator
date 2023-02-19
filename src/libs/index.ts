import { Commander } from './commands';
import { InitArgs } from './commands/init';
import { OpenApiCommand } from './commands/openapi';
import { YamlParser } from './parser/yaml';

export function bootstrap(path: string, cmd: string, target?: string) {
  if (cmd === 'gen:openapi') {
    console.log(`Parsing OpenAPI schema file at : ${path}...`);
    new OpenApiCommand().execute(path ?? '');
    return;
  }

  console.log(`Parsing yml schema file at : ${path}...`);
  const data = new YamlParser().parse(path) as Omit<InitArgs, 'target'>;

  Commander.run(cmd, { ...data, target });
}
