import { readFileSync } from 'fs';
import { BaseParser } from './index';
import { getPath } from '../../utils';

export interface EnvParserArgs {
  path?: string;
  content?: string;
}

export class EnvParser implements BaseParser {
  parse(data: EnvParserArgs) {
    if (data.content) return this.parseStr(data.content);
    if (data.path) return this.parseFile(data.path);
    return {};
  }

  parseStr(envStr: string): Record<string, string> {
    const unFormattedLines = envStr.split('\n');
    const formattedLines = unFormattedLines.filter(
      (line: string) => line.trim().length > 0 && !line.startsWith('#'),
    );
    const result: Record<string, string> = {};

    for (const line of formattedLines) {
      const [key, ...value] = line.split('=');
      result[key] = this.removeStrTokens(value.join('='));
    }

    return result;
  }

  parseFile(path: string) {
    const $path = getPath(path);
    const content = readFileSync($path, 'utf-8');
    return this.parseStr(content);
  }

  removeStrTokens(str: string) {
    let result: string = str;
    if (result.startsWith("'") || result.startsWith('"')) {
      result = result.slice(1);
    }
    if (result.endsWith("'") || result.endsWith('"')) {
      result = result.slice(0, result.length - 1);
    }
    return result;
  }

  unparse(data: Record<string, string | number>) {
    return Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
  }

  static getPath(name: string) {
    if (name === 'default') return '.env';
    return `.env.${name}`;
  }
}
