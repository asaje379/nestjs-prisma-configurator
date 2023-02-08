import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Generator } from '.';
import { Format } from '../formatter';
import { BASE_CONSTANTS } from '../variables/base/constants';
import { Globals } from '../variables/globals';
import { BASE_ERROR } from '../variables/base/error';
import { BASE_PAGINATION } from '../variables/base/pagination';
import { BASE_SCHEMA } from '../variables/base/schema';
import { BASE_ENTITY } from '../variables/base/entity';

export class BaseGenerator extends Generator {
  generate(): void {
    if (!existsSync(Globals.BASE_FOLDER)) {
      mkdirSync(Globals.BASE_FOLDER);
    }

    writeFileSync(
      Globals.BASE_FOLDER + '/contants.ts',
      Format.ts(BASE_CONSTANTS),
    );

    writeFileSync(Globals.BASE_FOLDER + '/entity.ts', Format.ts(BASE_ENTITY));

    writeFileSync(Globals.BASE_FOLDER + '/error.ts', Format.ts(BASE_ERROR));

    writeFileSync(
      Globals.BASE_FOLDER + '/pagination.ts',
      Format.ts(BASE_PAGINATION),
    );

    writeFileSync(Globals.BASE_FOLDER + '/schema.ts', Format.ts(BASE_SCHEMA));
  }
}
