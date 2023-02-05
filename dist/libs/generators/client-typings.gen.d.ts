import { Model } from './../../interfaces/index';
import { Generator } from '.';
export declare class ClientTypingsGenerator extends Generator {
    models: Record<string, Record<string, Model>>;
    enums: Record<string, string[]>;
    constructor(models: Record<string, Record<string, Model>>, enums: Record<string, string[]>);
    generate(): void;
}
