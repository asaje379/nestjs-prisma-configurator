export type ModuleFileType = 'module' | 'service' | 'controller' | 'typings';
export declare abstract class Generator {
    protected $path: string;
    constructor(path?: string);
    getSrcPath(): string;
    filePath(filename: string, type: ModuleFileType): string;
    abstract generate(): void;
}
