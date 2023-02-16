import { Commander } from './commands';
import { InitArgs } from './commands/init';
import { OpenApiCommand } from './commands/openapi';
import { ApiPathsParser } from './parser/swagger/schema/paths';
import { YamlParser } from './parser/yaml';

export function bootstrap(path: string, cmd: string, target?: string) {
  if (cmd === 'gen:openapi') {
    console.log(`Parsing OpenAPI schema file at : ${path}...`);
    new OpenApiCommand().execute(path ?? '');
    // new ApiPathsParser().parse()
    return;
  }

  console.log(`Parsing yml schema file at : ${path}...`);
  // const data = new YamlParser().parse(path) as Omit<InitArgs, 'target'>;

  // for (const name in data.models) {
  //   console.log(`Generating ${name} module ...`);
  //   new GenericResGenerator({ name, model: data.models[name] }).generate();
  // }

  // Commander.run(cmd, { ...data, target });
}
