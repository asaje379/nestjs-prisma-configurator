import { Generator } from '.';
import { capitalize, kebabToCamel } from '../../utils/index';

export class EnumPrismaGenerator extends Generator {
  enums: Record<string, string[]>;

  constructor(enums: Record<string, string[]>) {
    super();
    this.enums = enums ?? {};
  }

  generate(): string {
    const lines = [];

    for (const $enum in this.enums) {
      lines.push(generateSchemaEnum($enum, this.enums[$enum]));
    }

    return lines.join('\n');
  }

  generateForTarget(target: string) {
    return generateSchemaEnum(target, this.enums[target]);
  }
}

export function generateSchemaEnum(name: string, values: string[]) {
  const lines = [`enum ${capitalize(kebabToCamel(name))} {`];
  for (const value of values) {
    lines.push(` ${value.toUpperCase()}`);
  }
  lines.push('}');
  return lines.join('\n');
}
