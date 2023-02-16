import { Generator } from '.';
import { createDir, createFile, getPath } from '../../utils';
import { Format } from '../formatter';
import { Globals } from '../variables/globals';

export class HelpersGenerator extends Generator {
  generate(): void {
    const path = getPath(Globals.UTILS_FOLDER);

    createDir(path);

    createFile(
      `${path}/helpers.ts`,
      Format.ts(`
    export class Helpers {
  static numberOrString(value: number | string) {
    if (isNaN(+value)) return value;
    return Number(value);
  }
}`),
    );
  }
}
