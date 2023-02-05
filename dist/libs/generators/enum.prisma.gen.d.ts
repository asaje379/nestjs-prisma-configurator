import { Generator } from '.';
export declare class EnumPrismaGenerator extends Generator {
    enums: Record<string, string[]>;
    constructor(enums: Record<string, string[]>);
    generate(): string;
    generateForTarget(target: string): string;
}
export declare function generateSchemaEnum(name: string, values: string[]): string;
