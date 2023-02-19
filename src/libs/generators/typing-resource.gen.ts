import { Attrs, Model, Types } from '../../interfaces';
import { JsTypesMapping } from '../variables';
import { Generator } from '.';
import { capitalize, createDir, createFile, kebabToCamel } from '../../utils';
import { Format } from '../formatter';
import { setValidationDecorator } from '../../utils/interface';
import { join } from 'path';
import { generateEntity } from '../../utils/entity';
import { generateSerializer } from '../../utils/serializers';

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
    const dtoFolderPath = join(this.getSrcPath(), 'dto');
    const entitiesFolderPath = join(this.getSrcPath(), 'entities');
    const serializersFolderPath = join(this.getSrcPath(), 'serializers');

    createDir(dtoFolderPath);
    createDir(entitiesFolderPath);
    createDir(serializersFolderPath);

    const createPath = join(dtoFolderPath, `create-${this.$name}.dto.ts`);

    createFile(createPath, Format.ts(this.generateCreateDto()));

    const updatePath = join(dtoFolderPath, `update-${this.$name}.dto.ts`);
    createFile(updatePath, Format.ts(this.generateUpdateDto()));

    const entityPath = join(entitiesFolderPath, `${this.$name}.entity.ts`);
    createFile(entityPath, Format.ts(generateEntity(this.$name, this.$value)));

    const serializerPath = join(
      serializersFolderPath,
      `${this.$name}.serializer.ts`,
    );
    createFile(serializerPath, Format.ts(generateSerializer(this.$name)));
  }

  generateCreateDto() {
    const cleanName = capitalize(kebabToCamel(this.$name));

    // Create Typing Generation
    const lines = [`export class Create${cleanName} {`];
    const imports = [
      "import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'",
    ];
    const enums: string[] = [];

    const validationImportation = this.generateLines(this.$value, enums, lines);

    lines.push('}');

    // Import enums
    if (enums.length > 0)
      imports.push(`import {${enums.join(',')}} from '@prisma/client'`);

    // Import class-validator
    if (validationImportation.length > 0) {
      imports.push(
        `import {${validationImportation.join(',')}} from 'class-validator'`,
      );
    }

    // Merge all together
    return [imports.join('\n'), lines.join('\n')].join('\n \n');
  }

  generateUpdateDto() {
    const cleanName = capitalize(kebabToCamel(this.$name));

    // Create Typing Generation
    const lines = [`export class Update${cleanName} {`];
    const imports = ["import { ApiPropertyOptional } from '@nestjs/swagger'"];
    const enums: string[] = [];

    const validationImportation = this.generateLines(
      this.$value,
      enums,
      lines,
      false,
    );

    lines.push('}');

    // Import enums
    if (enums.length > 0)
      imports.push(`import {${enums.join(',')}} from '@prisma/client'`);

    // Import class-validator
    if (validationImportation.length > 0) {
      imports.push(
        `import {${validationImportation.join(',')}} from 'class-validator'`,
      );
    }

    // Merge all together
    return [imports.join('\n'), lines.join('\n')].join('\n \n');
  }

  generateLines(
    value: Record<string, Model>,
    enums: any[],
    lines: string[],
    checkRequired: boolean = true,
  ) {
    let validationsImportList: string[] = [];
    for (const attr in value) {
      const cols = [];
      const type = value[attr].type as Types;

      if (type === Types.ENUM && !enums.includes(value[attr].enum))
        enums.push(value[attr].enum);

      let decorators: string[] = [];
      let importations: string[] = [];

      if (value[attr].validations) {
        console.log(value[attr].validations);
        const info = setValidationDecorator(
          value[attr].validations as Record<string, string | number | boolean>,
        );
        decorators = info.decorators;
        importations = info.importations;
        validationsImportList = [
          ...validationsImportList,
          ...info.importations,
        ];
      }

      if (attr === Attrs.ID) continue;

      if (type === Types.REF) {
        cols.push(`@ApiProperty() ${attr}Id : string`);
        continue;
      }

      const requiredCondition =
        Attrs.REQUIRED in value[attr] && !value[attr].required;

      cols.push(
        `\n${decorators.join('\n')}\n@ApiProperty${
          requiredCondition || !checkRequired ? 'Optional' : ''
        }(${
          type === Types.ENUM ? `{enum: ${value[attr].enum}}` : ''
        }) \n${attr}${requiredCondition || !checkRequired ? '?' : ''}: ${
          type === Types.ENUM ? value[attr].enum : JsTypesMapping[type]
        }`,
      );

      lines.push(cols.join(' '));
    }
    return [...new Set(validationsImportList)];
  }
}
