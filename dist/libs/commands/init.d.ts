import { Model } from './../../interfaces/index';
import { BaseCommand } from '.';
export interface InitArgs {
    models: Record<string, Record<string, Model>>;
    enums: Record<string, string[]>;
    target?: string;
}
export declare class InitCommand implements BaseCommand {
    execute(args: InitArgs): void;
}
