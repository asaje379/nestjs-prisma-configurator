import { OpenApiOptions } from './../generators/openapi.gen';
import { WebsocketCommand } from './websocket';
import { CrudResGenerator } from './../generators/crud-resource.gen';
import { MainDotTsInitCommand } from './main-ts';
import { EnvInitCommand } from './env-init';
import { MainDotTsConfig } from './../generators/main-ts.gen';
import { GenericResGenerator } from './../generators/generic-resource.gen';
import { PrismaResGenerator } from './../generators/prisma-resource.gen';
import { GeneratePrismaCommand } from './generate-prisma';
import { Model } from './../../interfaces/index';
import { BaseCommand } from '.';
import { Installer } from '../installer';
import { DatabaseInitCommand } from './db-init';
import { MigrationScriptCommand } from './migration-script';
import { HelpersCommand } from './helpers';
import { BaseInitCommand } from './base-init';

export interface InitArgs {
  models: Record<string, Record<string, Model>>;
  enums: Record<string, string[]>;
  database: Record<string, Record<string, string | number>>;
  env: Record<string, Record<string, string | number>>;
  server: MainDotTsConfig;
  target?: string;
  openapi?: string;
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

    // Generate prisma module
    console.log('Generating prisma module ...');
    new PrismaResGenerator().generate();

    console.log('Generating crud module ...');
    new CrudResGenerator().generate();

    // Generate websocket module
    console.log('Generating websocket module ...');
    new WebsocketCommand().execute();

    // Generate helpers
    console.log('Generating helpers ...');
    new HelpersCommand().execute();

    // Generate base
    console.log('Generating base files ...');
    new BaseInitCommand().execute();

    for (const name in args.models) {
      console.log(`Generating ${name} module ...`);
      new GenericResGenerator({ name, model: args.models[name] }).generate();
    }
    console.log('Done with success. Enjoy !');
  }
}
