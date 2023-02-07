import { format } from 'prettier';

export class Format {
  static ts(value: string) {
    return format(value, { parser: 'typescript', singleQuote: true });
  }

  static json(value: string) {
    return format(value, { parser: 'json' });
  }
}
