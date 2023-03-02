import { InitArgs } from './init';
import { Globals } from '../variables/globals';
import { appendFileSync, existsSync, rmSync, mkdirSync, cpSync } from 'fs';
import { EnumPrismaGenerator } from '../generators/enum.prisma.gen';
import { ModelPrismaGenerator } from '../generators/model.prisma.gen';
import { execSync } from 'child_process';
import { BaseCommand } from '.';

export interface InitGeneratePrismaArgs extends InitArgs {
  init?: boolean;
}

export class GeneratePrismaCommand implements BaseCommand {
  execute({
    enums,
    models,
    init = true,
    target = undefined,
  }: InitGeneratePrismaArgs): void {
    if (init) {
      this.handleInit();
    }

    if (!target) {
      const schema = [
        new ModelPrismaGenerator(models).generate(),
        '\n',
        new EnumPrismaGenerator(enums).generate(),
      ].join('\n');

      this.generate(schema);
      return;
    }

    if (target in models) {
      this.generate(new ModelPrismaGenerator(models).generateForTarget(target));
      return;
    }

    if (target in enums) {
      this.generate(new EnumPrismaGenerator(enums).generateForTarget(target));
      return;
    }
  }

  private handleInit() {
    if (!existsSync(Globals.PRISMA_FOLDER_PATH)) {
      execSync(`npx prisma init`);
    }

    console.log(Globals.PRISMA_MIG_PATH);
    if (existsSync(Globals.PRISMA_MIG_PATH)) {
      mkdirSync(Globals.PRISMA_MIG_TMP_PATH);

      cpSync(Globals.PRISMA_MIG_PATH, Globals.PRISMA_MIG_TMP_PATH, {
        recursive: true,
        force: true,
      });
    }

    rmSync(Globals.PRISMA_FOLDER_PATH, { recursive: true, force: true });

    execSync(`npx prisma init`);

    cpSync(Globals.PRISMA_MIG_TMP_PATH, Globals.PRISMA_MIG_PATH, {
      recursive: true,
      force: true,
    });
    rmSync(Globals.PRISMA_MIG_TMP_PATH, { recursive: true, force: true });
  }

  generate(schema: string) {
    appendFileSync(Globals.PRISMA_FULL_PATH, schema, 'utf-8');
    execSync(`npx prisma format --schema ${Globals.PRISMA_FULL_PATH}`);
  }
}
