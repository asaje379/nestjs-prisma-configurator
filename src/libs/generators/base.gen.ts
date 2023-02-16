import { Generator } from '.';
import { Format } from '../formatter';
import { BASE_CONSTANTS } from '../variables/base/constants';
import { Globals } from '../variables/globals';
import { BASE_ERROR } from '../variables/base/error';
import { BASE_PAGINATION } from '../variables/base/pagination';
import { BASE_SCHEMA } from '../variables/base/schema';
import { BASE_ENTITY } from '../variables/base/entity';
import { createDir, createFile } from '../../utils';

export class BaseGenerator extends Generator {
  generate(): void {
    createDir(Globals.BASE_FOLDER);

    createFile(
      Globals.BASE_FOLDER + '/constants.ts',
      Format.ts(BASE_CONSTANTS),
    );
    createFile(Globals.BASE_FOLDER + '/entity.ts', Format.ts(BASE_ENTITY));
    createFile(Globals.BASE_FOLDER + '/error.ts', Format.ts(BASE_ERROR));
    createFile(
      Globals.BASE_FOLDER + '/pagination.ts',
      Format.ts(BASE_PAGINATION),
    );
    createFile(Globals.BASE_FOLDER + '/schema.ts', Format.ts(BASE_SCHEMA));
  }
}
