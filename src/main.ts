#!/usr/bin/env node
import { bootstrap } from './libs';
import { getPath } from './utils';

if (process.argv.length < 4 || process.argv.length > 5) {
  // Show usage
  console.log('Error!');
  process.exit(1);
}

const dbFilePath = getPath(process.argv[2]);
const cmd = process.argv[3];
const target = process.argv[4];

bootstrap(dbFilePath, cmd, target);
