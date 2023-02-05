import { Model } from './../../interfaces/index';
import { Generator } from '.';
export declare class ModelPrismaGenerator extends Generator {
    models: Record<string, Record<string, Model>>;
    constructor(models: Record<string, Record<string, Model>>);
    generate(): string;
    generateForTarget(target: string): string;
}
export declare function generateModel(name: string, value: Record<string, Model>): string;
