import { PackageDotJsonGenerator } from '../generators/package-json.gen';
import { BaseCommand } from './index';

export class MigrationScriptCommand implements BaseCommand {
  execute(): void {
    const packageDotJson = PackageDotJsonGenerator.read();
    const scripts = packageDotJson.scripts;

    scripts['migrate'] = 'prisma migrate dev';
    scripts['migrate:prod'] = 'prisma migrate prod';
    scripts.dev = scripts['start:dev'];

    new PackageDotJsonGenerator({ ...packageDotJson, scripts }).generate();
  }
}
