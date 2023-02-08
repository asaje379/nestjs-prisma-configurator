import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { Generator, ModuleFileType } from '.';
import { Format } from '../formatter';

export interface NestResource {
  name: string;
  value: string;
}
export interface NestResourceGeneratorOptions {
  path: string;
  data: Partial<Record<ModuleFileType, string | NestResource>>;
}

export interface NestFileGenOptions {
  filename: string;
  type: ModuleFileType;
  data: string | NestResource;
}

export class NestResourceGenerator extends Generator {
  private $resources: Partial<Record<ModuleFileType, string | NestResource>> =
    {};
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
    const path =
      typeof data === 'string'
        ? this.filePath(filename, type)
        : this.filePath(`${filename}/${filename}.${data.name}`, type);

    if (!existsSync(path)) {
      execSync(`npx nest g ${type} ${filename} --no-spec`);
    }

    writeFileSync(
      path,
      Format.ts(typeof data === 'string' ? data : data.value),
      'utf-8',
    );
  }
}
