import { Globals } from '../libs/variables/globals';
import { Types } from '../interfaces/index';
import { Model } from '../interfaces';
import { JsTypesMapping } from '../libs/variables';
import { camelToKebab, kebabToCamel, capitalize, createFile } from '.';
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

export function getType(
  type: Types,
  value: Record<string, Model>,
  attr: string,
) {
  if (type === Types.REF) return value[attr].model;
  if (type === Types.ENUM) return value[attr].enum;
  return JsTypesMapping[type];
}

export function generateInterfaces(
  models: Record<string, Record<string, Model>>,
) {
  for (const name in models) {
    createFile(
      `${Globals.CLIENT_TYPES_FOLDER_NAME}/interfaces/${camelToKebab(
        name,
      ).toLowerCase()}.ts`,
      Format.ts(
        generateInterface(capitalize(kebabToCamel(name)), models[name]),
      ),
    );
  }
}

const validationsMapping: Record<string, (a: any) => string> = {
  min: (value: number) => `@Min(${value})`,
  max: (value: number) => `@Max(${value})`,
  minLength: (value: number) => `@MinLength(${value})`,
  maxLength: (value: number) => `@MaxLength(${value})`,
  isInt: () => '@IsInt()',
  isDate: () => '@IsDate()',
  isEmail: () => '@IsEmail()',
  isString: () => '@IsString()',
  contains: (value: string) => `@Contains(${value})`,
  isEmpty: () => '@IsEmpty()',
  isNotEmpty: () => '@IsNotEmpty()',
  isDefined: () => '@IsDefined()',
  isOptional: () => '@IsOptional()',
  equals: () => '@Equals()',
  notEquals: () => '@NotEquals()',
  isIn: (values: any[]) => `@IsIn(${values})`,
  isNotIn: (values: any[]) => `@IsNotIn(${values})`,
  isBoolean: () => '@IsBoolean()',
  isNumber: () => '@IsNumber()',
  isArray: () => '@IsArray()',
  isEnum: (entity: object) => `@IsEnum(${entity})`,
  isPositive: () => '@IsPositive()',
  isNegative: () => '@IsNegative()',
  minDate: (date: string) => `@MinDate(${new Date(date)})`,
  maxDate: (date: string) => `@MaxDate(${new Date(date)})`,
  isBooleanString: () => '@IsBooleanString()',
  isDateString: () => '@IsDateString()',
  notContains: (value: string) => `@NotContains(${value})`,
  isAplha: () => '@IsAplha()',
  isAlphanumeric: () => '@IsAlphanumeric()',
  isDecimal: () => '@IsDecimal()',
};

export function setValidationDecorator(
  data: Record<string, string | number | boolean>,
) {
  const decorators = [];
  for (const key in data) {
    if (!(key in validationsMapping)) {
      throw 'Invalid validation key: ' + key;
    }
    decorators.push(validationsMapping[key](data[key] ?? undefined));
  }
  const importations = decorators.map((item) =>
    item.substring(1, item.indexOf('(')),
  );
  return { decorators, importations };
}
