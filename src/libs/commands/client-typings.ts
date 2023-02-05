import { InitArgs } from './init';
import { ClientTypingsGenerator } from './../generators/client-typings.gen';
import { BaseCommand } from '.';

export class ClientTypingsCommand implements BaseCommand {
  execute(args: InitArgs): void {
    new ClientTypingsGenerator(args.models, args.enums).generate();
  }
}
