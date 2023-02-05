import { Model } from '../../interfaces';
import { NestResourceGenerator } from './nest-resource.gen';
export interface GenericResGeneratorOptions {
    name: string;
    model: Record<string, Model>;
}
export declare class GenericResGenerator extends NestResourceGenerator {
    private $name;
    private $model;
    constructor(options: GenericResGeneratorOptions);
    generate(): void;
}
