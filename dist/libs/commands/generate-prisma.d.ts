import { InitArgs } from './init';
import { BaseCommand } from '.';
export interface InitGeneratePrismaArgs extends InitArgs {
    init?: boolean;
}
export declare class GeneratePrismaCommand implements BaseCommand {
    execute({ enums, models, init, target, }: InitGeneratePrismaArgs): void;
    generate(schema: string): void;
}
