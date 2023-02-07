import { Globals } from '../variables/globals';
import { writeFileSync } from 'fs';
import { Types } from '../interfaces/index';
import { Model } from '../interfaces';
import { JsTypesMapping } from '../variables';
import { camelToKebab, kebabToCamel, capitalize } from '.';
import { Format } from '../libs/formatter';

export function generateInterface(name: string, value: Record<string, Model>) {
  const lines = [`export interface ${name} {`];
  const imports = [];

  for (const attr in value) {
    const cols = [attr, '?:'];
    const type = value[attr].type as Types;

    cols.push(`${getType(type, value, attr)}`);

    if (type === Types.REF) {
      imports.push(
        `import {${value[attr].model}} from './${camelToKebab(
          value[attr].model ?? '',
        ).toLowerCase()}'`,
      );
    }

    if (type === Types.ENUM) {
      imports.push(
        `import {${value[attr].enum}} from '../enums/${camelToKebab(
          value[attr].enum ?? '',
        ).toLowerCase()}'`,
      );
    }

    lines.push(cols.join(' '));
  }

  lines.push('}');

  return [imports.join('\n'), lines.join('\n')].join('\n \n');
}

function getType(type: Types, value: Record<string, Model>, attr: string) {
  if (type === Types.REF) return value[attr].model;
  if (type === Types.ENUM) return value[attr].enum;
  return JsTypesMapping[type];
}

export function generateInterfaces(
  models: Record<string, Record<string, Model>>,
) {
  for (const name in models) {
    writeFileSync(
      `${Globals.CLIENT_TYPES_FOLDER_NAME}/interfaces/${camelToKebab(
        name,
      ).toLowerCase()}.ts`,
      Format.ts(
        generateInterface(capitalize(kebabToCamel(name)), models[name]),
      ),
      'utf-8',
    );
  }
}
