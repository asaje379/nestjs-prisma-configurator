import { ApiParser } from '..';
import { capitalize } from '../../../../utils';
import { Format } from '../../../formatter';

export type ApiPropertyType = 'string' | 'number' | 'boolean' | 'date-time';

export interface ApiPropertySchema {
  [key: string]: {
    type: ApiPropertyType;
    enum: string[];
  };
}

export interface ApiComponentsSchema {
  schemas: Record<string, { properties: Record<string, ApiPropertySchema> }>;
}

export class ApiPropertyParser extends ApiParser<string> {
  parse(schema: ApiPropertySchema, name: string, required: string[]): string {
    const types = [];

    const requiredAction = (attr: string) =>
      required.includes(attr) ? '' : '?';

    const lines = [`export interface ${name} {`];
    for (const attr in schema) {
      if (!('enum' in schema[attr])) {
        lines.push(`${attr}${requiredAction(attr)}: ${schema[attr].type}`);
        continue;
      }
      const typeName = `${name}${capitalize(attr)}`;
      types.push(
        `export type ${typeName} = ${schema[attr].enum
          .map((item) => `'${item}'`)
          .join('|')}`,
      );

      lines.push(`${attr}${requiredAction(attr)}: ${typeName}`);
    }

    lines.push('}');

    return Format.ts(`${types.join('\n')}\n${lines.join('\n')}`);
  }
}
