import { InitArgs } from './init';
export interface BaseCommand {
    execute(args?: any): void;
}
export declare const CommanderList: Record<string, any>;
export declare class Commander {
    static run(cmd: string, args: InitArgs): any;
}
