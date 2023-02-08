export enum Attrs {
  TYPE = 'type',
  UNIQUE = 'unique',
  REQUIRED = 'required',
  DEFAULT = 'default',
  ID = 'id',
  MODEL = 'model',
  ENUM = 'enum',
  VALIDATIONS = 'validations',
}

export enum Formats {
  INCREMENT = 'increment',
  UUID = 'uuid',
}

export enum Types {
  STRING = 'string',
  INT = 'int',
  FLOAT = 'float',
  BOOL = 'bool',
  REF = 'ref',
  ENUM = 'enum',
}

export interface Model {
  [Attrs.TYPE]?: Types;
  [Attrs.UNIQUE]?: boolean;
  [Attrs.REQUIRED]?: boolean;
  [Attrs.DEFAULT]?: unknown;
  [Attrs.ID]?: Formats;
  [Attrs.MODEL]?: string;
  [Attrs.ENUM]?: string;
  [Attrs.VALIDATIONS]?: Record<string, string | number | boolean>;
}
