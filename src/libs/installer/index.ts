import { existsSync } from 'fs';
import { execSync } from 'child_process';

type PM = 'yarn' | 'npm' | 'pnpm';

const pmCmd = {
  yarn: 'add',
  npm: 'install',
  pnpm: 'add',
};

const runCmd = {
  yarn: 'yarn',
  npm: 'npm run',
  pnpm: 'pnpm run',
};

export class Installer {
  static dependencies = [
    '@nestjs/swagger',
    'nestjs-prisma-pagination',
    'prisma',
    '@prisma/client',
    'nestjs-redoc',
    'class-transformer',
    'class-validator',
    '@nestjs/websockets',
    '@nestjs/platform-socket.io',
    'socket.io',
  ];
  static pm = 'npm';

  static devDependencies = ['@dotenv/cli'];

  static getPackageManager() {
    const basePath = process.cwd();
    if (existsSync(`${basePath}/yarn.lock`)) return 'yarn';
    if (existsSync(`${basePath}/pnpm-lock.yaml`)) return 'pnpm';
    if (existsSync(`${basePath}/pnpm-lock.yml`)) return 'pnpm';
    return 'npm';
  }

  static installDependencies() {
    const pm = Installer.getPackageManager();
    Installer.pm = pm;
    console.log("Package manager detected, let's use", pm);
    console.log('Installing dependencies...');
    execSync(
      `${pm} ${pmCmd[Installer.pm as PM]} ${Installer.dependencies.join(' ')}`,
    );
  }

  static run(script: string) {
    const $script = `${runCmd[Installer.pm as PM]} ${script}`;
    execSync($script);
  }
}
