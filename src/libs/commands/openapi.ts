import { readFileSync } from 'fs';
import { OpenapiGenerator, OpenApiOptions } from './../generators/openapi.gen';

export class OpenApiCommand {
  execute(path: string): void {
    console.log('path', path);
    const schema = readFileSync(path, 'utf-8');
    new OpenapiGenerator(JSON.parse(schema) as OpenApiOptions).generate();
  }
}
