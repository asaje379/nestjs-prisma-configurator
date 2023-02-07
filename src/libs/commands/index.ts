import { EnvInitCommand } from './env-init';
import { DatabaseInitCommand } from './db-init';
import { ClientTypingsCommand } from './client-typings';
import { GeneratePrismaCommand } from './generate-prisma';
import { InitCommand, InitArgs } from './init';

export interface BaseCommand {
  execute(args: InitArgs): void;
}

export const CommanderList: Record<string, any> = {
  init: (args: InitArgs) => new InitCommand().execute(args),

  'gen:prisma': (args: InitArgs) =>
    new GeneratePrismaCommand().execute({ ...args, init: true }),

  'gen:prisma:target': (args: InitArgs) =>
    new GeneratePrismaCommand().execute({ ...args, init: false }),

  'gen:client-typings': (args: InitArgs) =>
    new ClientTypingsCommand().execute(args),

  'gen:db': (args: InitArgs) => new DatabaseInitCommand().execute(args),

  'gen:env': (args: InitArgs) => new EnvInitCommand().execute(args),
};

export class Commander {
  static run(cmd: string, args: InitArgs) {
    if (!(cmd in CommanderList)) {
      console.log(`Error: invalid command ${cmd}`);
      process.exit(1);
    }
    return CommanderList[cmd](args);
  }
}
