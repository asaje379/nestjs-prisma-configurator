import { Model } from './../../interfaces/index';
import { existsSync, mkdirSync } from 'fs';
import { Generator } from '.';
import { generateEnums } from '../../utils/enum';
import { generateInterfaces } from '../../utils/interface';

export class ClientTypingsGenerator extends Generator {
  models: Record<string, Record<string, Model>>;
  enums: Record<string, string[]>;

  constructor(
    models: Record<string, Record<string, Model>>,
    enums: Record<string, string[]>,
  ) {
    super();
    this.models = models ?? {};
    this.enums = enums ?? {};
  }

  generate() {
    console.log('Generating client typings ...');
    if (!existsSync('client-typings')) {
      mkdirSync('client-typings');
    }

    if (!existsSync('client-typings/enums')) {
      mkdirSync('client-typings/enums');
    }

    if (!existsSync('client-typings/interfaces')) {
      mkdirSync('client-typings/interfaces');
    }

    generateEnums(this.enums);
    generateInterfaces(this.models);
  }
}
