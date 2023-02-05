import { existsSync } from 'fs';
import { execSync } from 'child_process';

const pmCmd = {
  yarn: 'add',
  npm: 'install',
  pnpm: 'add',
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
    console.log('Detected package manager : ', pm);
    execSync(`${pm} ${pmCmd[pm]} ${Installer.dependencies.join(' ')}`);
  }
}
