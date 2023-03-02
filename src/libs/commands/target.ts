import { GenericResGenerator } from './../generators/generic-resource.gen';
import {
  GeneratePrismaCommand,
  InitGeneratePrismaArgs,
} from './generate-prisma';
import { BaseCommand } from '.';

export class TargetCommand implements BaseCommand {
  execute(args: InitGeneratePrismaArgs): void {
    if (!args.target) {
      console.log(
        'Invalid value for `target` argument: string expected, but, ' +
          args.target +
          ' got!',
      );
      process.exit(1);
    }

    new GeneratePrismaCommand().execute({ ...args, init: false });

    new GenericResGenerator({
      name: args.target ?? '',
      model: args.models[args.target ?? ''],
    }).generate();
    console.log('Updated with success. Enjoy !');
  }
}
