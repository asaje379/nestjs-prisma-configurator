import { Model } from './../../interfaces/index';
import { existsSync, mkdirSync } from 'fs';
import { Generator } from '.';
import { generateEnums } from '../../utils/enum';
import { generateInterfaces } from '../../utils/interface';
import { createDir } from '../../utils';

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

    createDir('client-typings');

    createDir('client-typings/enums');

    createDir('client-typings/interfaces');

    generateEnums(this.enums);
    generateInterfaces(this.models);
  }
}
