import { IdMapping, TypesMapping } from '../variables/index';
import { Types, Attrs, Formats, Model } from './../../interfaces/index';
import { Generator } from '.';
import { capitalize, kebabToCamel } from '../../utils';

export class ModelPrismaGenerator extends Generator {
  models: Record<string, Record<string, Model>>;

  constructor(models: Record<string, Record<string, Model>>) {
    super();
    this.models = models ?? {};
  }

  generate() {
    const lines = [];
    for (const model in this.models) {
      lines.push(
        generateModel(capitalize(kebabToCamel(model)), this.models[model]),
      );
    }
    return lines.join('\n\n');
  }

  generateForTarget(target: string) {
    return generateModel(capitalize(kebabToCamel(target)), this.models[target]);
  }
}

export function generateModel(name: string, value: Record<string, Model>) {
  const lines = [`model ${name} {`];
  for (const attr in value) {
    const cols = [attr];
    const type = value[attr].type as Types;

    cols.push(
      `${getType(type, value, attr)}${
        Attrs.REQUIRED in value[attr] && !value[attr].required ? '?' : ''
      }`,
    );
    if (Attrs.DEFAULT in value[attr]) {
      cols.push(`@default(${value[attr].default})`);
    }
    if ('id' in value[attr]) {
      cols.push(`@id @default(${IdMapping[value[attr].id as Formats]})`);
    }

    lines.push(cols.join(' '));
  }
  lines.push('enabled Boolean @default(true)');
  lines.push('createdAt DateTime @default(now())');
  lines.push('updatedAt DateTime @default(now())');
  lines.push('}');
  return lines.join('\n');
}

function getType(type: Types, value: Record<string, Model>, attr: string) {
  if (type === Types.REF) return value[attr].model;
  if (type === Types.ENUM) return value[attr].enum;
  return TypesMapping[type];
}
