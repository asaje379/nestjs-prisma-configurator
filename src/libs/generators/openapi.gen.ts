import { ApiPathsParser } from './../parser/swagger/schema/paths';
import {
  ApiPropertySchema,
  ApiPropertyParser,
} from './../parser/swagger/schema/property';
import { Generator } from '.';
import { createDir, createFile } from '../../utils';
import { Globals } from '../variables/globals';
import { appendFileSync } from 'fs';
import { Format } from '../formatter';

export interface OpenApiOptions {
  paths: any;
  components: {
    schemas: Record<
      string,
      { properties: ApiPropertySchema; required: string[] }
    >;
  };
}

export class OpenapiGenerator extends Generator {
  schema: OpenApiOptions | null;

  constructor(schema?: OpenApiOptions) {
    super();
    this.schema = schema ?? null;
  }

  generate(): void {
    this.generateComponents();
  }

  generateComponents() {
    if (this.schema) {
      createDir(Globals.OPEN_API_FOLDER);

      const schemas = this.schema.components.schemas;
      const types: string[] = Object.keys(schemas);

      for (const schema in schemas) {
        const content = new ApiPropertyParser().parse(
          schemas[schema].properties ?? {},
          schema,
          schemas[schema].required ?? [],
        );
        appendFileSync(
          Globals.OPEN_API_COMPONENTS + '.ts',
          content + '\n',
          'utf-8',
        );
      }

      const paths = this.schema.paths;

      const parser = new ApiPathsParser();
      const parsed = parser.parse(paths);
      const fetchGenerated = parser.generateApi(JSON.parse(parsed), types);
      createFile(Globals.OPEN_API_API + '.ts', Format.ts(fetchGenerated));
    }
  }
}
