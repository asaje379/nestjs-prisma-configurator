import { BaseParser } from './index';
import { readFileSync } from 'fs';
import Yaml from 'yaml';

export class YamlParser implements BaseParser {
  parse(path: string) {
    const file = readFileSync(path, 'utf8');
    const result = Yaml.parse(file);
    return result;
  }
}
