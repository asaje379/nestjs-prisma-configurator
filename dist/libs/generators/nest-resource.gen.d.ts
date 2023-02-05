import { Generator, ModuleFileType } from '.';
export interface NestResourceGeneratorOptions {
    path: string;
    data: Partial<Record<ModuleFileType, string>>;
}
export interface NestFileGenOptions {
    filename: string;
    type: ModuleFileType;
    data: string;
}
export declare class NestResourceGenerator extends Generator {
    private $resources;
    constructor(options: NestResourceGeneratorOptions);
    generate(): void;
    generateNestResource(options: NestFileGenOptions): void;
}
