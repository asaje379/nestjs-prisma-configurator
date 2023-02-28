import { Formats, Types } from '../../interfaces/index';
export const TypesMapping = {
  [Types.INT]: 'Int',
  [Types.STRING]: 'String',
  [Types.BOOL]: 'Boolean',
  [Types.FLOAT]: 'Float',
  [Types.REF]: undefined,
  [Types.ENUM]: undefined,
  [Types.DATE]: 'DateTime',
  [Types.JSON]: 'Json',
};

export const JsTypesMapping = {
  [Types.INT]: 'number',
  [Types.STRING]: 'string',
  [Types.BOOL]: 'boolean',
  [Types.FLOAT]: 'number',
  [Types.ENUM]: undefined,
  [Types.DATE]: 'Date',
  [Types.REF]: undefined,
  [Types.JSON]: 'any',
};

export const IdMapping: Record<Formats, string> = {
  [Formats.INCREMENT]: 'autoincrement()',
  [Formats.UUID]: 'uuid()',
  [Formats.CUID]: 'cuid()',
};
