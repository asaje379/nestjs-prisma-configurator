import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { Generator, ModuleFileType } from '.';
import { Format } from '../formatter';
import { createFile } from '../../utils';

export interface NestResource {
  name: string;
  value: string;
}
export interface NestResourceGeneratorOptions {
  path: string;
  data: Partial<Record<ModuleFileType, string>>;
}

export interface NestFileGenOptions {
  filename: string;
  type: ModuleFileType;
  data: string;
}

export class NestResourceGenerator extends Generator {
  private $resources: Partial<Record<ModuleFileType, string>> = {};
  constructor(options: NestResourceGeneratorOptions) {
    const { path, data } = options;
    super(path);
    this.$resources = data;
  }

  generate() {
    for (const res in this.$resources) {
      const resource = res as ModuleFileType;
      this.generateNestResource({
        filename: this.$path,
        type: resource,
        data: this.$resources[resource] ?? '',
      });
    }
  }

  generateNestResource(options: NestFileGenOptions) {
    const { filename, type, data } = options;
    const path = this.filePath(filename, type);

    if (!existsSync(path) && type !== 'typings' && type !== 'crud-controller') {
      execSync(`npx nest g ${type} ${filename} --no-spec`);
    }

    if (type === 'crud-controller') {
      createFile(
        this.filePath(filename + '.crud', 'controller'),
        Format.ts(data),
      );
      return;
    }

    createFile(path, Format.ts(data));
  }
}
