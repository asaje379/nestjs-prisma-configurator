import { BaseParser } from './..';

export abstract class ApiParser<T> implements BaseParser {
  abstract parse(...args: any[]): T;
}
