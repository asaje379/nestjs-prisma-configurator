import { Model } from '../interfaces';
export declare function generateInterface(name: string, value: Record<string, Model>): string;
export declare function generateInterfaces(models: Record<string, Record<string, Model>>): void;
