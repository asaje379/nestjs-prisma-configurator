export type ModuleFileType = 'module' | 'service' | 'controller' | 'typings';

export abstract class Generator {
  protected $path: string = '';

  constructor(path?: string) {
    this.$path = path ?? '';
  }

  getSrcPath() {
    return `${process.cwd()}/src/${this.$path}`;
  }

  filePath(filename: string, type: ModuleFileType) {
    return this.getSrcPath() + `/${filename}.${type}.ts`;
  }

  abstract generate(): void;
}
