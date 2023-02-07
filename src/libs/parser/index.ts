export interface BaseParser {
  parse: (...args: any[]) => any;
  unparse?: (...args: any[]) => any;
}
