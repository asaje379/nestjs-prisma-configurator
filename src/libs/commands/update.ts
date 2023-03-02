import { GenericResGenerator } from './../generators/generic-resource.gen';
import { MigrationScriptCommand } from './migration-script';
import { MainDotTsInitCommand } from './main-ts';
import { EnvInitCommand } from './env-init';
import { DatabaseInitCommand } from './db-init';
import { GeneratePrismaCommand } from './generate-prisma';
import { BaseCommand } from '.';
import { InitArgs } from './init';

export class UpdateCommand implements BaseCommand {
  execute(args: InitArgs): void {
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

    for (const name in args.models) {
      console.log(`Generating ${name} module ...`);
      new GenericResGenerator({ name, model: args.models[name] }).generate();
    }
    console.log('Done with success. Enjoy !');
  }
}
