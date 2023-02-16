import { Generator } from '.';

export interface DatabaseConfig {
  user?: string;
  pass?: string;
  port?: number;
  name?: string;
  host?: string;
}

export class DatabaseConfigGenerator extends Generator {
  user: string;
  pass: string;
  port: number;
  name: string;
  host: string;

  constructor({
    user = 'postgres',
    pass = 'root',
    port = 5432,
    name = 'test',
    host = 'localhost',
  }: DatabaseConfig) {
    super();
    this.user = user;
    this.pass = pass;
    this.port = port;
    this.name = name;
    this.host = host;
  }

  generate(): string {
    return `postgresql://${this.user}:${this.pass}@${this.host}:${this.port}/${this.name}?schema=public`;
  }
}
