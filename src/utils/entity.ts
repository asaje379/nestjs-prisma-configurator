import { capitalize } from '.';
import { Model, Types } from '../interfaces';
import { JsTypesMapping } from '../libs/variables';
import { getType } from './interface';

export function generateEntity(name: string, value: Record<string, Model>) {
  const capitalName = capitalize(name);
  const imports = [];
  const lines = [`export class ${capitalName} extends BaseEntity {`];

  for (const attr in value) {
    const type = value[attr].type as Types;

    if (type === Types.ENUM) {
      imports.push(value[attr].enum);
    }

    if (type === Types.REF) {
      imports.push(value[attr].model);
      lines.push(
        `@ApiResponseProperty() ${attr}Id: ${
          JsTypesMapping[value.id.type as Types]
        }`,
      );
    }

    lines.push(`@ApiResponseProperty() ${attr}: ${getType(type, value, attr)}`);
  }

  if (imports.length > 0) {
    lines.unshift(`import {${imports.join(',')}} from '@prisma/client'`);
  }

  lines.push('@ApiResponseProperty() createdAt: Date;');
  lines.push('@ApiResponseProperty() updatedAt: Date;');
  lines.push('enabled: boolean;');
  lines.push('}');

  return `
import { BaseEntity } from '../../base/entity';
import { ApiResponseProperty } from '@nestjs/swagger';

${lines.join('\n')}`;
}
