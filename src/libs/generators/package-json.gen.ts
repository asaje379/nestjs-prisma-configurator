import { Globals } from '../variables/globals';
import { readFileSync } from 'fs';
import { Generator } from '.';
import { Format } from '../formatter';
import { createFile } from '../../utils';

export interface PackageDotJson {
  scripts: Record<string, string>;
}

export class PackageDotJsonGenerator extends Generator {
  content: string;

  constructor(content: PackageDotJson) {
    super();
    this.content = JSON.stringify(content);
  }

  generate() {
    createFile(Globals.PACKAGE_DOT_JSON, Format.json(this.content));
  }

  static read() {
    const content = readFileSync(Globals.PACKAGE_DOT_JSON, {
      encoding: 'utf-8',
    });
    return JSON.parse(content) as PackageDotJson;
  }
}
