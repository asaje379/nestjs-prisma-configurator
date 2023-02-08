import { camelToKebab, capitalize, kebabToCamel } from '../../utils';
import { Formats, Types } from '../../interfaces/index';
export const TypesMapping = {
  [Types.INT]: 'Int',
  [Types.STRING]: 'String',
  [Types.BOOL]: 'Boolean',
  [Types.FLOAT]: 'Float',
  [Types.REF]: undefined,
  [Types.ENUM]: undefined,
};

export const JsTypesMapping = {
  [Types.INT]: 'number',
  [Types.STRING]: 'string',
  [Types.BOOL]: 'boolean',
  [Types.FLOAT]: 'number',
  [Types.ENUM]: undefined,
};

export const IdMapping: Record<Formats, string> = {
  [Formats.INCREMENT]: 'autoincrement()',
  [Formats.UUID]: 'uuid()',
};
