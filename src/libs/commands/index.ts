import { UpdateCommand } from './update';
import { OpenApiCommand } from './openapi';
import { EnvInitCommand } from './env-init';
import { DatabaseInitCommand } from './db-init';
import { GeneratePrismaCommand } from './generate-prisma';
import { InitCommand, InitArgs } from './init';
import { TargetCommand } from './target';

export interface BaseCommand {
  execute(args: InitArgs): void;
}

export const CommanderList: Record<string, any> = {
  init: (args: InitArgs) => new InitCommand().execute(args),

  update: (args: InitArgs) => new UpdateCommand().execute(args),

  'gen:prisma': (args: InitArgs) =>
    new GeneratePrismaCommand().execute({ ...args, init: true }),

  'gen:target': (args: InitArgs) =>
    new TargetCommand().execute({ ...args, init: false }),

  'gen:db': (args: InitArgs) => new DatabaseInitCommand().execute(args),

  'gen:env': (args: InitArgs) => new EnvInitCommand().execute(args),

  'gen:sdk': (args: string) => new OpenApiCommand().execute(args),
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
