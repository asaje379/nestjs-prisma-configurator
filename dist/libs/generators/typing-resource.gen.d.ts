import { Model } from '../../interfaces';
import { Generator } from '.';
export interface TypingResGeneratorOptions {
    name: string;
    value: Record<string, Model>;
}
export declare class TypingResGenerator extends Generator {
    private $name;
    private $value;
    constructor(options: TypingResGeneratorOptions);
    generate(): void;
    generateTypingRes(): string;
    generateLines(value: Record<string, Model>, enums: any[], lines: string[], checkRequired?: boolean): void;
}
