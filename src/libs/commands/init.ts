import { MainDotTsInitCommand } from './main-ts';
import { EnvInitCommand } from './env-init';
import { MainDotTsConfig } from './../generators/main-ts.gen';
import { GenericResGenerator } from './../generators/generic-resource.gen';
import { RepositoryResGenerator } from './../generators/repository-resource.gen';
import { PrismaResGenerator } from './../generators/prisma-resource.gen';
import { ClientTypingsGenerator } from './../generators/client-typings.gen';
import { GeneratePrismaCommand } from './generate-prisma';
import { Model } from './../../interfaces/index';
import { BaseCommand } from '.';
import { Installer } from '../installer';
import { DatabaseInitCommand } from './db-init';
import { MigrationScriptCommand } from './migration-script';

export interface InitArgs {
  models: Record<string, Record<string, Model>>;
  enums: Record<string, string[]>;
  database: Record<string, Record<string, string | number>>;
  env: Record<string, Record<string, string | number>>;
  server: MainDotTsConfig;
  target?: string;
}

export class InitCommand implements BaseCommand {
  execute(args: InitArgs): void {
    // Install dependencies
    console.log('Installing dependencies...');
    Installer.installDependencies();

    // Init prisma
    console.log('Prisma configuration...');
    new GeneratePrismaCommand().execute(args);

    // Init database configs
    console.log('Initialising database configs');
    new DatabaseInitCommand().execute(args);

    // Init envs
    console.log('Initialising env variables...');
    new EnvInitCommand().execute(args);

    // Generate main.ts file
    console.log('Generating main.ts file');
    new MainDotTsInitCommand().execute(args);

    // Update package.json file
    console.log('Updating package.json file');
    new MigrationScriptCommand().execute();

    // // Init client typings
    // console.log('Client typings');
    // new ClientTypingsGenerator(args.models, args.enums).generate();

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
