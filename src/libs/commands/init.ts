import { GenericResGenerator } from './../generators/generic-resource.gen';
import { RepositoryResGenerator } from './../generators/repository-resource.gen';
import { PrismaResGenerator } from './../generators/prisma-resource.gen';
import { ClientTypingsGenerator } from './../generators/client-typings.gen';
import { GeneratePrismaCommand } from './generate-prisma';
import { Model } from './../../interfaces/index';
import { BaseCommand } from '.';
import { Installer } from '../installer';

export interface InitArgs {
  models: Record<string, Record<string, Model>>;
  enums: Record<string, string[]>;
  target?: string;
}

export class InitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    // Init prisma
    console.log('Prisma configuration...');
    new GeneratePrismaCommand().execute(args);

    // Init client typings
    console.log('Client typings');
    new ClientTypingsGenerator(args.models, args.enums).generate();

    // Install dependencies
    console.log('Installing dependencies...');
    Installer.installDependencies();

    console.log('Generating prisma module ...');
    new PrismaResGenerator().generate();

    console.log('Generating repository module ...');
    new RepositoryResGenerator().generate();

    for (const name in args.models) {
      console.log(`Generating ${name} module ...`);
      new GenericResGenerator({ name, model: args.models[name] }).generate();
    }
    console.log('Done with success. Enjoy !');
  }
}
