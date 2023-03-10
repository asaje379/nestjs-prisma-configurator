import { Format } from './../libs/formatter/index';
import { Globals } from '../libs/variables/globals';
import { writeFileSync } from 'fs';
import { camelToKebab, capitalize, createFile, kebabToCamel } from '.';

export function generateEnum(name: string, values: string[]) {
  const lines = [`export enum ${capitalize(kebabToCamel(name))} {`];
  for (const value of values) {
    lines.push(` ${value.toUpperCase()} = '${value.toUpperCase()}',`);
  }
  lines.push('}');
  return lines.join('\n');
}

export function generateEnums(enums: Record<string, string[]>) {
  for (const name in enums) {
    createFile(
      `${Globals.CLIENT_TYPES_FOLDER_NAME}/enums/${camelToKebab(
        name,
      ).toLowerCase()}.ts`,
      Format.ts(generateEnum(capitalize(kebabToCamel(name)), enums[name])),
    );
  }
}
