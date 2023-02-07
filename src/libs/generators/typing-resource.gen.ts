import { Attrs, Model, Types } from '../../interfaces';
import { JsTypesMapping, lowerUpperVarName } from '../../variables';
import { Generator } from '.';
import { writeFileSync } from 'fs';
import { capitalize, kebabToCamel } from '../../utils';
import { Format } from '../formatter';

export interface TypingResGeneratorOptions {
  name: string;
  value: Record<string, Model>;
}
export class TypingResGenerator extends Generator {
  private $name: string;
  private $value: Record<string, Model>;

  constructor(options: TypingResGeneratorOptions) {
    const { name, value } = options;
    super(name);
    this.$name = name;
    this.$value = value;
  }

  generate() {
    const path = this.filePath(
      lowerUpperVarName(this.$name).lowerName,
      'typings',
    );
    console.log(path);
    writeFileSync(path, Format.ts(this.generateTypingRes()), 'utf-8');
  }

  generateTypingRes() {
    const cleanName = capitalize(kebabToCamel(this.$name));

    // Create Typing Generation
    const lines = [`export class Create${cleanName} {`];
    const imports = [
      "import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'",
    ];
    const enums: string[] = [];

    this.generateLines(this.$value, enums, lines);

    lines.push('}');

    // Update Typing Generation
    lines.push(`\nexport class Update${cleanName} {`);

    this.generateLines(this.$value, enums, lines, false);

    lines.push('}');

    // Import enums
    if (enums.length > 0)
      imports.push(`import {${enums.join(',')}} from '@prisma/client'`);

    // Merge all together
    return [imports.join('\n'), lines.join('\n')].join('\n \n');
  }

  generateLines(
    value: Record<string, Model>,
    enums: any[],
    lines: string[],
    checkRequired: boolean = true,
  ) {
    for (const attr in value) {
      const cols = [];
      const type = value[attr].type as Types;

      if (type === Types.REF) continue;

      if (type === Types.ENUM && !enums.includes(value[attr].enum))
        enums.push(value[attr].enum);

      if (attr === Attrs.ID) continue;

      const requiredCondition =
        Attrs.REQUIRED in value[attr] && !value[attr].required;

      cols.push(
        `@ApiProperty${requiredCondition || !checkRequired ? 'Optional' : ''}(${
          type === Types.ENUM ? `{enum: ${value[attr].enum}}` : ''
        }) ${attr}${requiredCondition || !checkRequired ? '?' : ''}: ${
          type === Types.ENUM ? value[attr].enum : JsTypesMapping[type]
        }`,
      );

      lines.push(cols.join(' '));
    }
  }
}
